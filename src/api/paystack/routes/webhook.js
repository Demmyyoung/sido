module.exports = {
  routes: [
    {
      method: "POST",
      path: "/webhook",
      handler: "webhook.handleWebhook",
      config: {
        auth: false, // Webhooks are public but verified by signature
        policies: [],
        middlewares: [],
      },
    },
  ],
};
