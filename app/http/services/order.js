const Order = require('../../models/order');

exports.postOrder = async ({
  idMenu,
  idUser,
  idFood,
  quantity,
  totalPrice,
}) => {
  const postOrder = await Order.query().insert({
    idMenu: idMenu,
    idUser: idUser,
    idFood: idFood,
    quantity: quantity,
    totalPrice: totalPrice,
    status: 0,
  });

  return {
    message: 'Thêm order thành công',
  };
};

exports.getOrder = async () => {
  const listOrder = await Order.query().select('*');
  return {
    message: 'get order',
    data: listOrder,
  };
};

exports.patchOrder = async (idUser) => {
  const paymentOrder = await Order.query()
    .where('idUser', idUser)
    .where('status', 0)
    .patch({ status: 1 });
  return {
    message: 'Sửa thành công',
  };
};
