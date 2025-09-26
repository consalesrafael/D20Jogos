const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const router = require("./router/router");
const cookieParser = require("cookie-parser");

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);



// db.sync().then(() => {
//  }); 
    app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
  });
