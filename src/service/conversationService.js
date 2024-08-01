const Conversation = require('../model/conversation.js')

exports.conversationValidationByParticipantsId = async (senderId, receiverId) => {
    try {
        const conversationAvailibility = await Conversation.findOne({'participants' : [receiverId, senderId]})
        if (conversationAvailibility) {
            return false
        } else {
            return true
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

exports.createParticipants = async (participants) => {
    try {
        const newParticipants = Array.from(new Set(participants.push(req.decoded.id)))
        const arrayParticipants = newParticipants.map(participant => ({'userId' : participant, 'jointAt' : new Date.now()})) 
        if (arrayParticipants) {
            return arrayParticipants
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
        return null
    }
}