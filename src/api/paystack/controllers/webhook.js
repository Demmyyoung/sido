"use strict";

const crypto = require("crypto");

module.exports = {
  async handleWebhook(ctx) {
    const signature = ctx.request.headers["x-paystack-signature"];
    const secret = process.env.PAYSTACK_SECRET_KEY;

    if (!signature || !secret) {
      return ctx.badRequest("Missing signature or secret");
    }

    const hash = crypto
      .createHmac("sha512", secret)
      .update(JSON.stringify(ctx.request.body))
      .digest("hex");

    if (hash !== signature) {
      return ctx.badRequest("Invalid signature");
    }

    const event = ctx.request.body;

    if (event.event === "charge.success") {
      const { reference, metadata } = event.data;

      // Find order by paystack_ref or metadata
      // Since we saved paystack_ref in initializing, we can query by it.

      const [order] = await strapi.entityService.findMany("api::order.order", {
        filters: { paystack_ref: reference },
      });

      if (order) {
        await strapi.entityService.update("api::order.order", order.id, {
          data: {
            status: "paid",
          },
        });
        strapi.log.info(`Order ${order.id} verified and updated to paid.`);
      } else {
        strapi.log.warn(`Order with reference ${reference} not found.`);
      }
    }

    return ctx.send({ status: "success" });
  },
};
