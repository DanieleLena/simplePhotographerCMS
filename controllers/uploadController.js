const { StatusCodes } = require("http-status-codes");

const upload = async (req, res) => {
  //   const user = await User.create({ ...req.body });
  //   const token = user.createJWT();
  console.log("private route!!!");
  res.status(StatusCodes.OK).send("<h2>Sono nella private route</h2>");
};

module.exports = {
  upload,
};
