"use strict";

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Seed Roles
    const roleService = strapi.plugin("users-permissions").service("role");

    const roles = ["Buyer", "Seller"];

    for (const roleName of roles) {
      const roleExists = await strapi.db
        .query("plugin::users-permissions.role")
        .findOne({
          where: { name: roleName },
        });

      if (!roleExists) {
        await roleService.createRole({
          name: roleName,
          description: `Default ${roleName} role`,
          type: roleName.toLowerCase(),
        });
        strapi.log.info(`Created role: ${roleName}`);
      }
    }
  },
};
