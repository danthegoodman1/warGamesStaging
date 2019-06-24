const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const exec = require("child_process").execSync;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./build"));

let data = [{ name: "Corn", uid: "1", quant: 10, item: "Corn Starch" },
{ name: "Flower", uid: "2", quant: 10, item: "100% Flower" },
{ name: "Apples", uid: "3", quant: 13, item: "Grandma's Apples" }];

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.route("/hi").get((req, res, next) => {
  console.log("efie");
  res.send("hey");
});

app.route("/getItems").get((req, res, next) => {
  res.json({ data });
});

app.route("/addItem").post((req, res, next) => {
  data.push({
    name: req.body.name,
    quant: req.body.quant,
    item: req.body.item,
    uid: Math.random()
  });
  res.send("ok");
});

app.route("/delItem").post((req, res, next) => {
  data = data.filter(element => {
    if (element.uid != req.body.uid) {
      return element;
    }
  });
  res.send("ok");
});

app.listen(8080, () => {
  console.log("yup");
});
