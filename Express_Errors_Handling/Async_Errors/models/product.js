const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '상품명은 빈 칸일 수 없습니다.'],
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy'],
    },
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;