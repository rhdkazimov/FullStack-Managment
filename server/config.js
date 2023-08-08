const mongoose = require("mongoose");
const { ENV } = require("./_env");
let uri = `mongodb+srv://${ENV.MongoDB_UserName}:${ENV.MongoDB_Password}@cluster0.ngcbuk3.mongodb.net/e-commerce`
mongoose.connect(uri);