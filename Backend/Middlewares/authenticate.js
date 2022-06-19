const { verify } = require('jsonwebtoken');
const Instructor = require("../models/instructor");
const Student = require('../models/student')
const catchAsync = require('../utilities/catchAsync')
const AppError = require('../utilities/appError')
const { privatekey } = process.env

module.exports = {
    instructorToken : catchAsync( async (req, res, next) => {
        const token = req.headers.authorization
        if(!token) return next(new AppError('token needed', 400 ))
        const foundInstructor = await Instructor.findOne({accessToken : token})
        if(!foundInstructor) return next(new AppError('invalid credentials', 400 ))
        verify(token, privatekey, (err, _)=>{
            if(err && err.name == 'JsonWebTokenError') return next(new AppError('invalid credentials', 400 ))
            else if(err && err.name == 'TokenExpiredError') return next(new AppError('token expired', 400 ))
            next()
        })    
    }),

    studentToken : catchAsync( async (req, res, next) => {
        const token = req.headers.authorization
        if(!token) return next(new AppError('token needed', 400 ))
        const foundStudent = await Student.findOne({accessToken : token})
        if(!foundStudent) return next(new AppError('invalid credentials', 400 ))
        verify(token, privatekey, (err, _)=>{
            if(err && err.name == 'JsonWebTokenError') return next(new AppError('invalid credentials', 400 ))
            else if(err && err.name == 'TokenExpiredError') return next(new AppError('token expired', 400 ))
            next()
        })    
    })
}