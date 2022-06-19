const router = require('express').Router()
const {
    signUp,
    signIn,
    signOut,
    getCourses,
    getParticularCourse,
    buyCourse,
    getStudentData
} = require('../controllers/studentApiController')
const { studentToken } = require('../middlewares/authenticate')

router.post('/student/signUp', signUp)
router.post('/student/signIn', signIn)
router.delete('/student/signOut', studentToken, signOut)
router.get('/getallCourses', getCourses)
router.get('/getParticularCourse/:courseId', getParticularCourse)
router.post('/buyCourse/:courseId', studentToken, buyCourse)
router.get('/getStudentData', getStudentData)

module.exports = router