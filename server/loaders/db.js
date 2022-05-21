const Mongoose = require('mongoose');

const connectDb = async () => {
    if (process.env.MONGO_URL == null) {
        throw new Error("MONGO_URL not set in .env file");
    }
    await Mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('Connected to MongoDB!');
};

module.exports = {
    connectDb
};