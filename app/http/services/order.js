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
