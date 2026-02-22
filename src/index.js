"use strict";

module.exports = {
  async bootstrap({ strapi }) {
    // ... existing role seeding code ...
    const roleService = strapi.plugin("users-permissions").service("role");
    const roles = ["Buyer", "Seller"];
    for (const roleName of roles) {
      const roleExists = await strapi.db
        .query("plugin::users-permissions.role")
        .findOne({ where: { name: roleName } });
      if (!roleExists) {
        await roleService.createRole({
          name: roleName,
          description: `Default ${roleName} role`,
          type: roleName.toLowerCase(),
        });
        strapi.log.info(`Created role: ${roleName}`);
      }
    }

    // DEBUG: Check if columns exist in the database
    try {
      const userTable = await strapi.db.connection.schema.hasTable("up_users");
      if (userTable) {
        const hasIsSeller = await strapi.db.connection.schema.hasColumn(
          "up_users",
          "is_seller",
        );
        strapi.log.info(
          `[DEBUG] Table 'up_users' exists. Column 'is_seller' exists: ${hasIsSeller}`,
        );

        // Log all columns to be sure
        const columns = await strapi.db.connection("up_users").columnInfo();
        strapi.log.info(
          `[DEBUG] Columns in 'up_users': ${Object.keys(columns).join(", ")}`,
        );
      } else {
        strapi.log.error(`[DEBUG] Table 'up_users' does NOT exist.`);
      }
    } catch (err) {
      strapi.log.error(`[DEBUG] Error checking schema: ${err.message}`);
    }
  },
};
