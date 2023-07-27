const Chatroom = require('../models/Chatroom');
exports.createChatroom = async (req, res) => {
    const {name} = req.body;

    const nameRegex = /^[A-Za-z\s]+$/;

    if (!nameRegex.test(name)) throw "Invalid chatroom name.";

    const chatroomExists = await Chatroom.findOne({name});

    if (chatroomExists)throw "Chatroom already exist";

    const chatroom = new Chatroom({name,});

    await chatroom.save();

    await res.json({
        message: "Chatroom created!"
    });

};