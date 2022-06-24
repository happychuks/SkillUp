const router = require('express').Router()
const {
    signUp,
    signIn,
    signOut,
    getCourses,
    getParticularCourse,
    buyCourse,
    getStudentData,
    getAllStudents,
    getStudent
} = require('../controllers/studentApiController')
const { studentToken } = require('../middlewares/authenticate')

router.post('/signUp', signUp)
router.post('/signIn', signIn)
router.delete('/signOut', studentToken, signOut)
router.get('/', getAllStudents)
router.get('/getallCourses', getCourses)
router.get('/getParticularCourse/:courseId', getParticularCourse)
router.post('/buyCourse/:courseId', studentToken, buyCourse)
router.get('/getStudentData', getStudentData)
// router.get('/:_id', getStudent)

module.exports = router