const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const EXPRESS_PORT = 3000;
const Product = require("./models/product");
const Farm = require("./models/farm");

// DATABASE CONNECT
main().catch((err) => console.log(`[MONGO DB 연결 실패] ${err}`));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/farmStand");
  console.log("[MONGO DB 연결 성공]");
}

// EXPRESS SET
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// FARM ROUTES
app.get('/farms', async (req, res) => {
  const farms = await Farm.find({});
  res.render('farms/index.ejs', { farms });
})

app.delete('/farms/:id', async (req, res) => {
  const farm = await Farm.findByIdAndDelete(req.params.id);
  res.redirect('/farms');
})

app.get('/farms/new', (req, res) => {
  res.render('farms/new.ejs');
});

app.get('/farms/:id', async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id).populate('products');
  res.render('farms/show.ejs', { farm });
})

app.get('/farms/:id/products/new', async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id);
  res.render('products/new.ejs', { categories, farm });
})

app.post('/farms/:id/products', async (req, res) => {
  const { id } = req.params;
  const farm = await Farm.findById(id);
  const { name, price, category } = req.body;
  const product = new Product({ name, price, category });
  // 농장과 상품 연결하기
  farm.products.push(product);
  product.farm = farm;
  await farm.save();
  await product.save();
  res.redirect(`/farms/${id}`);
});

app.post('/farms', async (req, res) => {
  const farm = new Farm(req.body);
  await farm.save();
  res.redirect('/farms');
});


// PRODUCT ROUTES
const categories = ["fruit", "vegetable", "dairy", "fungi"];

app.get("/products", async (req, res) => {
  const { category } = req.query;
  if (category) {
    const products = await Product.find({ category: category });
    res.render("products/index.ejs", { products, category });
  } else {
    const products = await Product.find({});
    res.render("products/index.ejs", { products, category: "모든" });
  }
  const products = await Product.find({});
});

app.get("/products/new", (req, res) => {
  res.render("products/new.ejs", { categories });
});

app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  console.log(newProduct);
  res.redirect(`/products/${newProduct._id}`);
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate('farm', 'name');
  console.log(product);
  res.render("products/show.ejs", { product });
});

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  const product = await Product.findById(id);
  res.render("products/edit.ejs", { product, categories });
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.listen(EXPRESS_PORT, () => {
  console.log(`[포트 ${EXPRESS_PORT}에서 리스닝]`);
});
