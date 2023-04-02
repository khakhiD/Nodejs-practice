const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  console.log("connection success");
}

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ["Spring", "Summer", "Fall", "Winter"],
  },
});

const Product = mongoose.model("Product", productSchema);

const makeProduct = async () => {
  await Product.insertMany([
    { name: "개쩌는 멜론", price: 4.99, season: "Summer" },
    { name: "엄청 단 수박", price: 14.99, season: "Summer" },
    { name: "아스파라거스", price: 3.99, season: "Spring" },
  ]);
};

const { Schema } = mongoose;

const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})

const Farm = mongoose.model("Farm", farmSchema);
const makeFarm = async() => {
    const farm = new Farm({ name: '풀 벨리 농장', location: '경남 김해' });
    const melon = await Product.findOne({name: '개쩌는 멜론'});
    farm.products.push(melon);
    await farm.save();
    console.log(farm);
}

// makeProduct()
// makeFarm();

const addProduct = async () => {
    const farm = await Farm.findOne({ name: '풀 벨리 농장' });
    const watermelon = await Product.findOne({ name: '엄청 단 수박'});
    farm.products.push(watermelon);
    farm.save();
}

// addProduct();

Farm.findOne({ name: '풀 벨리 농장'})
    .populate('products')
    .then(farm => console.log(farm));
