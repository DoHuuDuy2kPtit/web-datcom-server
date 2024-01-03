const getSearchFood = async (req, res) => {
  try {
    const { searchFood } = req.query;
    const responseData = await foodService.getSearchFood(searchFood);
    return res.status(200).json({
      message: `Danh sách tìm kiếm các menu có món ${searchFood}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};
module.exports = getSearchFood;
