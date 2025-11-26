const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const router = require("./router/router");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const session = require("express-session");

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    secret: "segredo-d20jogos",
    resave: false,
    saveUninitialized: true
  })
);

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
