const {Router} = require("express");
const multer = require("multer");
const userRouter = Router();
const {
  getAllUSers,
  deleteUserById,
  getUserById,
  editUserById,
  postNewUser,
  postNewUserImg,
} = require("../controller/userController.js");


const storage = multer.diskStorage({
  destination: function (req, file, cb)  {
    cb(null, 'server/Images');
  },
  filename: (req, file, cb) => {  
    const filename = req.params.id
    cb(null,filename+'.jpg');
  },
});
const upload = multer({ storage: storage });

userRouter.get('/users',verifyToken,getAllUSers)
userRouter.get("/delete/:id", verifyToken,deleteUserById);
userRouter.get("/users/:id", verifyToken,getUserById);
userRouter.put("/edit/:id", verifyToken,editUserById );
userRouter.post("/user/create", verifyToken,postNewUser);
userRouter.post("/user/create/img/:id",verifyToken,upload.single('img'),postNewUserImg);


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