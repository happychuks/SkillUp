const { Schema, model } = require('mongoose')
const { hash, compare } = require('bcryptjs')
const  validator = require('validator')
  
const instructorSchema = new Schema({
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
    }],
    revenue : {
        type : Number,
        required : false
    }
}, {timestamps : true })

instructorSchema.statics.findByEmailAndPassword = async (email, password) =>{
    try {
        const foundInstructor = await Instructor.findOne({email});
        if(!foundInstructor) throw new Error('email not found');
        const isMatched = await compare(password, foundInstructor.password);
        if(!isMatched) throw new Error('incorrect password');
        return foundInstructor;
    } catch (error) {
        error.name = 'AuthError';
        throw error;
    } 
}

instructorSchema.pre('save', async function(next){
    const instructor = this 
    try {
        if(instructor.isModified('password')) {
            const hashedPassword = await hash(instructor.password, 10);
            instructor.password = hashedPassword
            next();
        }
    } catch (error) {
        console.error(error)
        next(error)
    }
})

const Instructor = model('instructor', instructorSchema)
module.exports = Instructor