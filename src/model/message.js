const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    conversationId : {type : mongoose.Schema.Types.ObjectId ,ref : 'Conversation' ,required: true},
    content : {type : string, required: true},
    createdAt : {type : Date, default : Date.now()},
    updatedAt : {type : Date, default : Date.now()},
    readBy : [{
        userId : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
        readAt : {type : Date}
    }]
})

const Message = mongoose.model('User', messageSchema)

module.exports = Message