const Conversation = require("../models/conversation.model")
const Message = require("../models/message.model")

exports.getMessages = async (req, res, next) => {

    try {
        // id of user we are chatting with
        const { id: userToId } = req.params;

        const senderId = req.user._id // added from protect middleware

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToId] }
        }).populate('messages');

        if (!conversation) return res.status(200).json({
            status: 'success',
            messages: []
        });

        res.status(200).json({
            status: 'success',
            messages: conversation.messages
        })

    } catch (error) {
        console.log(`💣 -.-> `, error.message);
        res.status(500).json({ status: 'failed', message: 'Something went wrong' })
    }
}


exports.sendMessage = async (req, res, next) => {
    try {
        const { id } = req.params
        const receiverId = id
        const { message } = req.body
        const senderId = req.user._id // added from protect middleware


        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = await Message.create({ senderId, receiverId, message });

        if (!conversation.messages) {
            conversation.messages = [];
        }
        conversation.messages.push(newMessage._id);
        await conversation.save()
        // Save the updated conversation (if necessary, depending on your schema)

        res.status(200).json({
            status: 'success',
            message: newMessage
        });

    } catch (error) {
        console.log(`💣 -.-> `, error.message);
        res.status(500).json({ status: 'failed', message: 'Something went wrong' })
    }
}