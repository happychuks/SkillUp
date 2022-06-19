const Courses  = require('../models/courses')
const Student = require('../models/student')
const Instructor = require('../models/instructor')
const catchAsync = require('../utilities/catchAsync')
const AppError = require('../utilities/appError')
const { verify } = require('jsonwebtoken')
const privateKey = process.env.privateKey
const {createToken} = require('../utilities/createToken')
const { populate } = require('../models/courses')
const stripe = require('stripe')('sk_test_51HUEyCDOfBXcEuEsTZCdBB0EyPYnqaNdEve90jIbZL5aMuJNfLFFHeMtqend6JfcCFOxKnRvfNh4b9y0EzZsnfNk00YehuaxbT')

module.exports = {
    signUp : catchAsync( async (req, res, next) => {
        const newStudent = await Student.create({...req.body})
        createToken(newStudent)
        await newStudent.save()
        res.status(200).json({
            status : 'success',
            user : 'student',
            message : 'registered successfully',
            data : newStudent
        })    
    }),

    signIn : catchAsync( async (req, res, next) => {
        const {email, password} = req.body
        const foundStudent = await Student.findByEmailAndPassword(email, password)
        if(!foundStudent) return next(new AppError('incorrect credentials', 400))
        createToken(foundStudent)
        foundStudent.save()
        res.status(200).json({
            status : 'success',
            user : 'consumer',
            message : 'loggedIn successfully',
            data : foundStudent
        })    
    }),

    signOut : catchAsync( async (req, res, next) => {
        const token = req.headers.authorization 
        const foundStudent = await Student.findOneAndUpdate({ accessToken: token }, { accessToken : null })
        if(!foundStudent) return next(new AppError( 'invalid credentials', 400 ))
        return res.json({
            status : 'success',
            'message' : 'loggedOut successfully'
        })    
    }),

    getCourses : catchAsync( async (req, res, next) => {
        const foundCourses = await Courses.find({})
        res.json({
            status : 'success',
            message : 'found all courses',
            data : foundCourses
        })    
    }),

    getParticularCourse : catchAsync( async (req, res, next) => {
        const courseId = req.params.courseId
        const foundCourse = await Courses.findById(courseId).populate('videos').populate('instructor')
        if(!foundCourse) return next(new AppError('invalid credentials', 400)) 
        res.json({
            status : 'success',
            message : 'found the course',
            data : foundCourse
        })    
    }),

    buyCourse : catchAsync( async (req, res, next) => {
        const accessToken = req.headers.authorization
        const studentId =  await verify(accessToken, privateKey)
        const courseId = req.params.courseId
        
        const { amount, source, receipt_email } = req.body
        const charge = await stripe.charges.create({
            amount,
            currency: 'ngn',
            source,
            receipt_email
          })
        
        if (!charge) throw new Error('charge unsuccessful')
        
        // update the data in student and in courses
        const foundStudent = await Student.findByIdAndUpdate(studentId.id, { $push : { courses : courseId }}, { new : true })
        const foundCourse = await Courses.findByIdAndUpdate(courseId , { $inc : { revenue : req.body.amount}}, { new : true })
        await Instructor.findByIdAndUpdate(foundCourse.instructor, { $inc : { revenue : req.body.amount}})

        res.json({
            status : 'success',
            message : 'bought the course successfully',
            charge : charge,
            data : foundStudent
        })    
    }),

    getStudentData : catchAsync( async (req, res, next) => {
        const accessToken = req.headers.authorization
        const studentId = await verify(accessToken, privateKey)
        if ( studentId == null || studentId == undefined ){
            return next( new AppError('token expired', 400))
        }
        const foundStudent = await Student.findById(studentId.id).populate('courses')
        const foundInstructor = await Instructor.findById(studentId.id).populate({path : 'courses', model : 'course', populate: { path: 'videos', model : 'videos'}}) //investigate the instructorid.id
        if(!foundInstructor && !foundStudent) return next(new AppError('invalid credentials', 400))
        if( foundStudent ){
            return res.json({
                status : 'success',
                user : 'student',
                data : foundStudent
            })
        }else if( foundInstructor ){
            return res.json({
                status : 'success',
                user : 'instructor',
                data : foundInstructor
            })
        }    
    })
}