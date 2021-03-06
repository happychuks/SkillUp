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
    instructorReply : {
        type : Schema.Types.ObjectId,
        ref : 'instructor'
    },
    studentReply : {
        type : Schema.Types.ObjectId,
        ref : 'student'
    }
})

const Questions = model('questions', QuestionsSchema)

module.exports = Questions