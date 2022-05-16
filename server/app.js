const express = require('express');
const app = express();

const config = require('./config');
const loaders = require('./loaders');

const routes = require('./routes');

const authentication = require('./middlewares/authentication');

config();
loaders();

app.use(express.json());

app.use('/api/auth', routes.authRoutes);

//Global authentication middleware
app.use('/api', authentication);

app.get('/', (req, res) => {
    res.send('Welcome to mailGo API');
});

app.use('/api/category', routes.categoryRoutes);
app.use('/api/campaign', routes.campaignRoutes);
app.use('/api/subscriber', routes.subscriberRoutes);
app.use('/api/user', routes.userRoutes);
app.use('/api/userrole', routes.userRoleRoutes);

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});