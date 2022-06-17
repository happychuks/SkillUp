const { Schema, model } = require('mongoose')

const QuestionsSchema = new Schema({
    reply : {
        type : String,
        required : true,
        trim : true
    },
    question : {
        type : Schema.Types.ObjectId,
        ref : 'questions'
    },
    uploaderReply : {
        type : Schema.Types.ObjectId,
        ref : 'instructor'
    },
    consumerReply : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    }
})

const Questions = model('questions', QuestionsSchema)

module.exports = Questions