const express = require('express');
const userRoutes = require('./apis/users');
const chatroomRoutes = require('./apis/chatroom');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/user', userRoutes);
app.use('/chatroom', chatroomRoutes);

//setup error handler
const errorHandler = require('./handler/errorHandler');
app.use(errorHandler.notFound);
app.use(errorHandler.mongooseErrors);
//bring in apis

if (process.env.ENV === 'DEVELOPMENT') {
    app.use(errorHandler.developmentErrors);
} else {
    app.use(errorHandler.productionErrors);
}

module.exports = app;