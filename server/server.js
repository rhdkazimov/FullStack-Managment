const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT | 3001;
const { userRouter } = require("./routes/userRoute");
const {authRouter} = require("./routes/authRoute")

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(userRouter)
app.use(authRouter)

app.listen(PORT, () => {
  console.log("Server Is Working...");
});

