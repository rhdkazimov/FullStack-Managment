const { DUserData } = require("../data/users");
const jwt = require("jsonwebtoken");
const secretKey = "jwtSecretKey";

const login = async (req, res) => {
    const {email,password} = req.body
    if (
      email === DUserData.email &&
      password === DUserData.password
    ) {
      const user = req.body;
      jwt.sign({ user }, secretKey, { expiresIn: "15m" }, (err, token) => {
        res.json({ token,user });
      });
    } else {
      res.sendStatus(404);
    }
  }


const register = (req, res) => {
    res.json({ RegisterMSG: "Register" });
  }

const logout = (req, res) => {
    res.json({ Message: "User is logouted" });
  }


module.exports = {login,register,logout}