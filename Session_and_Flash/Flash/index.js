const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Farm = require("./models/farm");
const session = require("express-session");
const flash = require("connect-flash");

const sessionOptions = {
  secret: "비밀",
  resave: false,
  saveUninitialized: false,
};

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(session(sessionOptions));
app.use(flash());


main().catch((err) => console.log(`[MONGO DB 연결 실패] ${err}`));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/farmStand");
  console.log("[MONGO DB 연결 성공]");
}

// FARM ROUTES
app.use((req, res, next) => {
  res.locals.messages = req.flash("success");
  next();
});

app.get("/farms", async (req, res) => {
  const farms = await Farm.find({});
  res.render("farms/index", { farms });
});

app.get("/farms/new", (req, res) => {
  res.render("farms/new");
});

app.get("/farms/:id", async (req, res) => {
  const farm = await Farm.findById(req.params.id).populate("products");
  res.render("farms/show", { farm });
});

app.post("/farms", async (req, res) => {
  const farm = new Farm(req.body);
  await farm.save();
  req.flash("success", "Successfully made a new farm!");
  res.redirect("/farms");
});

app.listen(3000, () => {
  console.log("APP IS LISTENING ON PORT 3000!");
});
