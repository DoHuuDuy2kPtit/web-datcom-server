const Food = require('../../models/food');

exports.getFood = async ({ idMenu }) => {
  const allFood = await Food.query().select('*').where('idMenu', idMenu);
  return { message: 'Đây là tất cả món ăn', data: allFood };
};

exports.postFood = async ({ idMenu, foodName, price, img }) => {
  const postFood = await Food.query().insert({
    idMenu: idMenu,
    foodName: foodName,
    price: price,
    img: img,
  });
  return {
    message: 'Thêm thành công',
  };
};

exports.deleteFood = async (idFood) => {
  await Food.query().del().where('idFood', idFood);
  return {
    message: 'Xóa thành công',
  };
};

exports.patchFood = async ({ idFood, foodName, price }) => {
  await Food.query().where('idFood', idFood).update({
    foodName: foodName,
    price: price,
  });
  return {
    message: 'Sửa thành công',
  };
};

exports.getSearchFood = async ({ searchFood }) => {
  await Food.query().where('foodName', searchFood);
  return {
    message: `Tìm kiếm món ăn`,
  };
};
