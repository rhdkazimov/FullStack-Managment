const {Router} = require("express");
const userRouter = Router();
const {
  getAllUSers,
  deleteUserById,
  getUserById,
  editUserById,
  postNewUser,
} = require("../controller/userController.js");


userRouter.get('/users',verifyToken,getAllUSers)
userRouter.get("/delete/:id", verifyToken,deleteUserById);
userRouter.get("/users/:id", verifyToken,getUserById);
userRouter.put("/edit/:id", verifyToken,editUserById );
userRouter.post("/user/create", verifyToken,postNewUser);

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== " ") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.send(404).json({ result: "Token is not valid !" });
  }
}


module.exports = {
    userRouter
}