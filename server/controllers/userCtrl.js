const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const user = await Users.findOne({ email });
      if (user) {
        return res.status(400).json({
          message: "Email already registered",
        });
      }
      if (password.length < 8) {
        return res.status(400).json({
          message: "Password should be atleast 8 characters",
        });
      }
      // password encryption
      const hashPassword = await bcrypt.hash(password, 10);

      // db me entry
      const newUser = await Users.create({
        name,
        email,
        password: hashPassword,
      });
      // creating jwt to authenticate
      const accessToken = createAccessToken({ id: newUser._id });

      const refreshtoken = createRefreshToken({ id: newUser._id });
      // cookie logic

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });
      res.json({
        token: accessToken,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "something went wrong",
      });
    }
  },
  refreshToken: async (req, res) => {
    try {
        console.log(req.cookies)
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) {
        return res.status(400).json({
          msg: "Please login or register",
        });
      }
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({ msg: "Please login or register" });
        const accessToken = createAccessToken({ id: user.id });
        res.json({user,accessToken});
      });
     
    } catch (error) {
        console.error(error);
      return res.status(500).json({
        msg: error.message,
      });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
module.exports = userCtrl;
