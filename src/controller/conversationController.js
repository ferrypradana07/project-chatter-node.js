const Conversation = require('../model/conversation')
const {createParticipants, conversationValidationByParticipantsId} = require('../service/conversationService')

// _id, participants, type, lastMessage
exports.createConversation = async (req, res) => {
    try {
        const {userIdTarget, type} = req.body??'';
        const messageId = req.messageId
        const arrayParticipants = await createParticipants(userIdTarget)
        const newConversation = await Conversation.create({'participants': arrayParticipants ,'type': type, 'lastMessage.messageId' : messageId})
        res.sendStatus(200)    
    } catch (error) {
        console.log(error)
        res.sendStatus(500)    
    }
}