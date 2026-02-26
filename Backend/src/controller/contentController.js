const homeData = require("../data/homeData");

const getHomeData = (req, res) => {
  return res.status(200).json(homeData);
};

module.exports = {
  getHomeData,
};
