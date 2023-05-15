const express = require("express");
const shareRoutes = require("./routes/share.js");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
var cors = require("cors");
const fileUpload = require("express-fileupload");

dotenv.config();

//Config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());

//Routes
app.use("/ongaku/share", shareRoutes);

//Root Directory
app.get("/ongaku", () => {
  console.log("GET on /ongaku");
});

//Listen on port 8000
app.listen(8000, () => {
  console.log("Listening on port 8000");
});
