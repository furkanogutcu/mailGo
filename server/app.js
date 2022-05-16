const express = require('express');
const app = express();

const config = require('./config');
const loaders = require('./loaders');

config();
loaders();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to mailGo API');
});

const port = process.env.APP_PORT || 3000;
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});