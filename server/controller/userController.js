require("../config");
const { ENV } = require("../_env");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getAllUSers = async (req, res) => {
  jwt.verify(req.token, ENV.JWT_SECRET_KEY, async (err, authData) => {
    if (!err) {
      const data = await User.find();
      res.json(data);
    } else {
      res.status(404).json({ result: "Token is not valid" });
    }
  });
};

const postNewUserImg = async (req, res) => {
  jwt.verify(req.token, ENV.JWT_SECRET_KEY, async (err) => {
    if (!err) {
      res.status(200);
    } else {
      res.status(404);
    }
  });
};

const deleteUserById = async (req, res) => {
  jwt.verify(req.token, ENV.JWT_SECRET_KEY, async (err, authData) => {
    if (err) {
      res.status(404).json({ result: "Token is not valid" });
    } else {
      let result = await User.deleteOne({ _id: req.params.id });
      res.send(result);
    }
  });
};

const getUserById = async (req, res) => {
  jwt.verify(req.token, ENV.JWT_SECRET_KEY, async (err, authData) => {
    if (!err) {
      const data = await User.findOne({ _id: req.params.id });
      if (data) {
        res.json(data);
      } else {
        res.json({ Message: "No Data Founded" });
      }
    } else {
      res.status(404).json({ result: "Token is not valid" });
    }
  });
};

const editUserById = async (req, res) => {
  jwt.verify(req.token, ENV.JWT_SECRET_KEY, async (err, authData) => {
    if (!err) {
      const data = await User.findOne({ _id: req.params.id });
      if (data) {
        const data = await User.updateOne(
          { _id: req.params.id },
          { $set: req.body }
        );
        res.json(data);
      } else {
        res.json({ Message: "No Data Founded" });
      }
    } else {
      res.status(404).json({ result: "Token is not valid" });
    }
  });
};

const postNewUser = async (req, res) => {
  jwt.verify(req.token, ENV.JWT_SECRET_KEY, async (err, authData) => {
    if (!err) {
      let user = new User(req.body);
      await user.save();
      res.send({ id: user.id });
    } else {
      res.send(404).json({ result: "Token is not valid" });
    }
  });
};

module.exports = {
  getAllUSers,
  deleteUserById,
  getUserById,
  editUserById,
  postNewUser,
  postNewUserImg,
};
