const mongoose = require('mongoose')

const participantSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, ref : "User", required : true},
    jointAt : {type : Date, default : Date.now()}
})
// conversation_id, user_id dan message_id
const conversationSchema = new mongoose.Schema({
    participants : [participantSchema],
    type : {type: String, enum : ['private', 'grup'], default : 'private'},
    createdAt : {type : Date, default : Date.now()},
    updatedAt : {type : Date, default : Date.now()},
    lastMessage : {
        messageId : {type : mongoose.Schema.Types.ObjectId, ref : 'Message'},
        content : String,
        createdAt : {type : Date, default : Date.now()}
    }
})

const Conversation = mongoose.model('Conversation', conversationSchema)

module.exports = {Conversation, participantSchema}