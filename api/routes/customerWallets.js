module.exports = app => {
  const controller = app.controllers.customerWallets;

  app.route('/api/')
    .get(controller.listCustomerWallets)

  app.route('/api/:customerId')
    .put(controller.updateCustomerWallets);
}