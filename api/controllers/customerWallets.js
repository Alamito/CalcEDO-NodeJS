const uuidv4 = require('uuid/v4');

module.exports = app => {
  const customerWalletsDB = app.data.customerWallets;
  const controller = {};

  const {
    equations: customerWalletsMock,
  } = customerWalletsDB;

  controller.listCustomerWallets = (req, res) => res.status(200).json(customerWalletsDB);

  controller.updateCustomerWallets = (req, res) => {
    const { 
      customerId,
    } = req.params;

    const foundCustomerIndex = customerWalletsMock.data.findIndex(customer => customer.id === customerId);

    if (foundCustomerIndex === -1) {
      res.status(404).json({
        message: 'ID não encontrado na base.',
        success: false,
        customerWallets: customerWalletsMock,
      });
    } else {
      const newCustomer = {
        id: customerId ,
        parentId: req.body.parentId,
        equation: req.body.equation,
        // createdAt: new Date() // adiciona data de criação ou atualização
      };
      
      customerWalletsMock.data.splice(foundCustomerIndex, 1, newCustomer);
      
      res.status(200).json({
        message: 'ID encontrado e atualizado com sucesso!',
        success: true,
        customerWallets: customerWalletsMock,
      });
    }
  }

  return controller;
}