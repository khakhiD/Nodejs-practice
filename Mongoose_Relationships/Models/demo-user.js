const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  console.log("connection success");
}

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            // id: { _id: false }, // 타입에러 발생
            street: String,
            city: String,
            state: String,
            country: String,
        }
    ]
})

const User = mongoose.model('User', userSchema);

const makeUser = async() => {
    const u = new User({
        first: '길동', last: '홍'
    });
    u.addresses.push({
        street: '123 Sesame St.',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    });
    const res = await u.save();
    console.log(res);
}

const addAddress = async (id) => {
    const u = await User.findById(id);
    u.addresses.push({
        street: '99 3rd St.',
        city: 'New York',
        state: 'NY',
        country: 'USA'
    })
    const res = await u.save();
    console.log(res);
}

addAddress('642977cac62719e67212417a');