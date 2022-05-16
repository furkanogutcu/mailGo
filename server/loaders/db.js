const Mongoose = require('mongoose');

const connectDb = async () =>{
    await Mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('Connected to MongoDB!');
};

module.exports = {
    connectDb
};