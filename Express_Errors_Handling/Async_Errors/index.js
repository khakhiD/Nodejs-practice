const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const AppError = require("./AppError");

const EXPRESS_PORT = 3000;
const Product = require("./models/product");

main().catch((err) => console.log(`[MONGO DB 연결 실패] ${err}`));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/farmStand2");
  console.log("[MONGO DB 연결 성공]");
}

function wrapAsync(func) {
  return function (req, res, next) {
    func(req, res, next).catch((e) => next(e));
  };
}

app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const categories = ["fruit", "vegetable", "dairy", "fungi"];

app.get("/products", wrapAsync(async (req, res, next) => {
    const { category } = req.query;
    if (category) {
      const products = await Product.find({ category: category });
      res.render("products/index.ejs", { products, category });
    } else {
      const products = await Product.find({});
      res.render("products/index.ejs", { products, category: "모든" });
    }
  })
);

app.get("/products/new", (req, res) => {
  // throw new AppError('NOT ALLOWED', 401); //예시용 코드 //삭제해도 무방
  res.render("products/new.ejs", { categories });
});

app.post("/products", wrapAsync(async (req, res, next) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
}));

app.get("/products/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      throw new AppError("Product Not Found", 404);
    }
    res.render("products/show.ejs", { product });
  })
);

app.get("/products/:id/edit", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      throw new AppError("Product Not Found", 404);
    }
    res.render("products/edit.ejs", { product, categories });
}));

app.put("/products/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    res.redirect(`/products/${product._id}`);
}));

app.delete("/products/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect("/products");
}));

const handleValidationError = err => {
    console.dir(err);
    return err;
}

// 에러 핸들러 - 로거
app.use((err, req, res, next) => {
    console.log(err.name);
    if(err.name === 'ValidationError') err = handleValidationError(err);
    next(err);
})

// 에러 핸들러
app.use((err, req, res, next) => {
  const { status = 500, message = "Went Wrong" } = err;
  res.status(status).send(message);
});

app.listen(EXPRESS_PORT, () => {
  console.log(`[포트 ${EXPRESS_PORT}에서 리스닝]`);
});
