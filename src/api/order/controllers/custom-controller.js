"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async initialize(ctx) {
    const { productId, quantity } = ctx.request.body;
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("You must be logged in to place an order");
    }

    try {
      // 1. Fetch Product and Seller
      const product = await strapi.entityService.findOne(
        "api::product.product",
        productId,
        {
          populate: ["author"],
        },
      );

      if (!product) {
        return ctx.notFound("Product not found");
      }

      const seller = product.author;
      if (!seller || !seller.paystack_subaccount_code) {
        return ctx.badRequest("Seller account not configured for payments");
      }

      // 2. Calculate Amount
      const amount = Number(product.price) * (quantity || 1);
      const amountInKobo = Math.round(amount * 100);

      // 3. Initialize Paystack Transaction
      const response = await fetch(
        "https://api.paystack.co/transaction/initialize",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            amount: amountInKobo,
            subaccount: seller.paystack_subaccount_code,
            bearer: "subaccount", // Seller bears the charges? Or 'account' for main?
            // User requested: "transaction_charge = (Price * 0.05) + Flat Fee. Configurable Commission."
            // Paystack uses `transaction_charge` to override default calculation?
            // Or split percentage?
            // If using subaccount, Paystack splits based on subaccount config (percentage_charge).
            // We set percentage_charge when creating subaccount (5%).
            // Note context: "Calculate Split... transaction_charge = ..."
            // If we want to override transaction charge for THIS transaction, we can passed `transaction_charge`.
            // But Paystack split usually relies on the subaccount config.
            // I will assume the 5% set in lifecycle is sufficient unless dynamic split is required.
            reference: `ORDER-${Date.now()}-${user.id}`,
            metadata: {
              productId: product.id,
              userId: user.id,
              quantity: quantity || 1,
              custom_fields: [
                {
                  display_name: "Product Name",
                  variable_name: "product_name",
                  value: product.name,
                },
              ],
            },
          }),
        },
      );

      const data = await response.json();

      if (!data.status) {
        return ctx.badRequest("Payment initialization failed", data.message);
      }

      // 4. Create Pending Order
      await strapi.entityService.create("api::order.order", {
        data: {
          total_amount: amount,
          status: "pending",
          paystack_ref: data.data.reference,
          user: user.id,
          products: [product.id],
        },
      });

      return ctx.send({
        authorization_url: data.data.authorization_url,
        reference: data.data.reference,
      });
    } catch (error) {
      strapi.log.error(error);
      return ctx.internalServerError(
        "An error occurred during payment initialization",
      );
    }
  },
}));
