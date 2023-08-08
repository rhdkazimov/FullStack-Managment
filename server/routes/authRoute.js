const {Router} = require("express");
const authRouter = Router();
const { login, logout, register } = require("../controller/authController");

authRouter.post("/login",login);
authRouter.get("/logout",logout);
authRouter.post("/register", register);

module.exports = {
    authRouter
}