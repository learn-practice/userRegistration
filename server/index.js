const express = require("express");
const app = express();
const connection = require("./db/dbConnection.js");
const env = require("dotenv");
const userRouter = require("./router/userRouter.js");
const cors = require("cors");
env.config();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 4000;
// app.use(bodyParser.config({encodeURI:true}));
//router
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
