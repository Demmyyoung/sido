"use strict";

/**
 * product router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::product.product", {
  config: {
    update: {
      policies: ["global::is-owner"],
    },
    delete: {
      policies: ["global::is-owner"],
    },
  },
});
