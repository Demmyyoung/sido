"use strict";

/**
 * is-owner policy
 */

module.exports = async (policyContext, config, { strapi }) => {
  const { user } = policyContext.state;
  const { id } = policyContext.params;

  if (!user) {
    return false;
  }

  const [product] = await strapi.entityService.findMany(
    "api::product.product",
    {
      filters: { id, author: user.id },
    },
  );

  if (!product) {
    return false;
  }

  return true;
};
