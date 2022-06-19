const { verify } = require('jsonwebtoken')
const privatekey = process.env.privatekey
const Courses = require('../models/courses')
const bufferToString = require('../utilities/bufferToString')
const Instructor = require('../models/instructor')
const {createToken} = require('../utilities/createToken')
const cloudinary = require('../utilities/cloudinary')
const Videos = require('../models/video')
const catchAsync = require('../utilities/catchAsync')
const AppError = require('../utilities/appError')

module.exports = {
    signUp : catchAsync(async (req, res, next) => {
            const newInstructor = await Instructor.create({...req.body})
            createToken(newInstructor)
            await newInstructor.save()
            res.status(200).json({
                status : 'success',
                user : 'instructor',
                message : 'registered successfully',
                data : newInstructor
            })
    }),

    signIn : catchAsync(async (req, res, next) => {
        const {email, password} = req.body
        const foundInstructor = await Instructor.findByEmailAndPassword(email, password)
        createToken(foundInstructor)
        foundInstructor.save()
        res.status(200).json({
            status : 'success',
            user : 'instructor',
            message : 'loggedIn successfully',
            data : foundInstructor
        })    
    }),

    signOut : async (req, res, next) => {
        const token = req.headers.authorization 
        const foundInstructor = await Instructor.findOneAndUpdate({ accessToken: token }, { accessToken : null })
        if(!foundInstructor) return next(new AppError('invalid credentials', 400))
        return res.json({
            status : 'success',
            'message' : 'loggedOut successfully'
        })    
    },

    createCourse : catchAsync(async (req, res, next) =>{
        const token = req.headers.authorization
        const decoded = await verify(token, privatekey) 
        const newCourse = await Courses.create({...req.body, instructor : decoded.id}) //observe
        await Instructor.findByIdAndUpdate(decoded.id, {$push : { courses : newCourse._id }})
        res.json({
            status : 'success',
            message : 'course created',
            data : newCourse
        })    
    }),

    addVideos : catchAsync(async (req, res, next) => {
        const { originalname, buffer } = req.file
        const videoContent = bufferToString( originalname, buffer)
        const { secure_url } = await cloudinary.v2.uploader.upload(
            videoContent, 
            { 
                resource_type: "video", 
                chunk_size: 6000000,
                eager: [
                    { width: 300, height: 300, crop: "pad", audio_codec: "none" }, 
                    { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" } ],                                   
                eager_async: true,
                eager_notification_url: "https://mysite.example.com/notify_endpoint" 
            })
        const courseId = req.params.courseId
        const newVideo = await Videos.create({...req.body, video : secure_url, course : courseId})
        await Courses.findByIdAndUpdate(courseId, { $push : { videos : newVideo }})
        const foundCourses = await Courses.findById(courseId).populate('videos')
        res.json({
            status : 'success',
            message : 'video added',
            data : foundCourses
        })    
    })
}