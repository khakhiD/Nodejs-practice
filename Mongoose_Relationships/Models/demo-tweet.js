const mongoose = require("mongoose");
const { Schema } = mongoose;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  console.log("connection success");
}

const userSchema = new Schema({
    username: String,
    age: Number,
})

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: [{ type: Schema.Types.ObjectId, ref: 'User'}]
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

const makeTweets = async () => {
    // const user = new User({ username: 'chickenfan99', age: 61 });
    const user = await User.findOne({ username: 'chickenfan99' })
    // const t1 = new Tweet({ text: 'I love my chicken', likes: 0 });
    const t2 = new Tweet({ text: 'BBQ is the best', likes: 390 });
    t2.user = user;
    user.save();
    t2.save();
}

// makeTweets();

const findTweets = async () => {
    const t = await Tweet.find({}).populate('user', 'username');
    console.log(t);
}
findTweets();