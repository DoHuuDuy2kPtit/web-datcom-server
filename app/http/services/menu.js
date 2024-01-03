const Menu = require('../../models/Menu');

exports.postMenu = async (idHost) => {
  const postMenu = await Menu.query().insert({
    idHost: idHost,
    menuName: 'Cơm trưa rikei',
  });

  return {
    message: 'Thêm thành công',
    idMenu: postMenu.id,
  };
};

exports.getAllHost = async () => {
  const getAllHost = await Menu.query()
    .select('menu.*', 'foods.*')
    .join('foods', 'menu.idMenu', 'foods.idMenu');
  const editData = getAllHost.reduce((acc, item) => {
    if (!acc[item.idMenu]) {
      acc[item.idMenu] = {
        idMenu: item.idMenu,
        menuName: item.menuName,
        idHost: item.idHost,
        foods: [],
      };
    }
    acc[item.idMenu].foods.push({
      idFood: item.idFood,
      foodName: item.foodName,
      price: item.price,
      img: item.img,
    });
    return acc;
  }, {});

  const rebuildata = Object.values(editData);

  return {
    message: 'Read all menu Host with restructured data',
    data: rebuildata,
  };
};
