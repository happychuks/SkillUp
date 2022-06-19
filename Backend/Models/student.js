const { Schema, model } = require('mongoose')
const { hash, compare } = require('bcryptjs')
const  validator = require('validator')
  
const studentSchema = new Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        minlength : 3
    },
    email:{
        type : String,
        required : true,
        trim : true,
        unique : true,
        validate : {
            validator : (data)=>{
                return validator.isEmail(data)
            },
            message : props => `${props.value} is not a valid mail id ` 
        }
    },
    password : {
        type : String,
        required : function(){
            return !this.isThirdPartyUser
        },
        trim : true,
        minlength : 5
    },
    isThirdPartyUser : {
        type : Boolean,
        required: false,
        default: false
    },
    accessToken : {
        type: String,
        required: false
    },
    tempToken : {
        type: String,
        required : false
    },
    verified : {
        type : Boolean,
        default : false,
        required : false
    },
    image : {
        type : String,
        required : false
    },
    DateOfBirth : {
        type : Date,
        validate : {
            validator : (data) => {
                return data.toLocaleDateString()
            },
            message : props => `${props.value} is not a valid date format`
        },
        required : false,
        default : new Date().toLocaleDateString()
    },
    gender : {
        type : String,
        default : 'male',
        enum : ['male', 'female', 'other']
    },
    Address : {
        city: {
            type : String,
            default : " "
        },
        
        state : {
            type : String,
            default : " "
        },
    },
    phoneNumber: {
        type: Number
    },
    courses : [{
        type : Schema.Types.ObjectId,
        ref : 'course'
    }]
}, {timestamps : true })

studentSchema.statics.findByEmailAndPassword = async (email, password) =>{
    try {
        const foundStudent = await Student.findOne({email});
        if(!foundStudent) throw new Error('email not found');
        const isMatched = await compare(password, foundStudent.password);
        if(!isMatched) throw new Error('incorrect password');
        return foundStudent;
    } catch (error) {
        error.name = 'AuthError';
        throw error;
    } 
}

studentSchema.pre('save', async function(next){
    const student = this 
    try {
        if(student.isModified('password')) {
            const hashedPassword = await hash(student.password, 10);
            student.password = hashedPassword
            next();
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
})

const Students = model('student', studentSchema)
module.exports = Students  //User