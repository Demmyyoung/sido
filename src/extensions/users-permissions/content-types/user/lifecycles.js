module.exports = {
  async afterCreate(event) {
    const { result, params } = event;

    if (
      result.is_seller &&
      result.shop_name &&
      result.bank_code &&
      result.account_number
    ) {
      try {
        const response = await fetch("https://api.paystack.co/subaccount", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            business_name: result.shop_name,
            settlement_bank: result.bank_code,
            account_number: result.account_number,
            percentage_charge: 5, // Configurable commission
          }),
        });

        const data = await response.json();

        if (data.status) {
          await strapi.entityService.update(
            "plugin::users-permissions.user",
            result.id,
            {
              data: {
                paystack_subaccount_code: data.data.subaccount_code,
              },
            },
          );
          strapi.log.info(`Created Paystack subaccount for user ${result.id}`);
        } else {
          strapi.log.error(
            `Failed to create Paystack subaccount: ${data.message}`,
          );
        }
      } catch (error) {
        strapi.log.error(
          `Error creating Paystack subaccount: ${error.message}`,
        );
      }
    }
  },
};
