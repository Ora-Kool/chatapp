require('dotenv').config();
const app = require('./app');
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
mongoose.connection.on('error', (err) => {
    console.log('Mongoose Connection error: ', err.message);
});
mongoose.connection.once('open', () => {
    console.log("MongoDB connected!");
});

//bring in modules
require('./models/User');
require('./models/Chatroom');
require('./models/Message');
app.listen(port, host, () => {
    console.log("Server listening on port: 8000")
});
