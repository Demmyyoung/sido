module.exports = {
  routes: [
    {
      method: "POST",
      path: "/orders/initialize",
      handler: "custom-controller.initialize",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
