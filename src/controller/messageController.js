const Message = require('../model/message.js')

exports.createMessage = async (req, res) => {
    try {
        const {roomId, content} = req.body??'';
        if (!roomId || !content) {
            return res.sendStatus(400)
        } else {
            const newMessage = await Message.create({'conversationId' : roomId, 'content' : content })
            return res.sendStatus(200)
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}
