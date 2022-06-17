const router = require('express').Router()
const {
    signUp,
    signIn,
    signOut,
    getCourses,
    getParticularCourse,
    buyCourse,
    getUserData
} = require('../controllers/userApiController')
const { userToken } = require('../middlewares/authenticate')

router.post('/user/signUp', signUp)
router.post('/user/signIn', signIn)
router.delete('/user/signOut', userToken, signOut)
router.get('/getallCourses', getCourses)
router.get('/getParticularCourse/:courseId', getParticularCourse)
router.post('/buyCourse/:courseId', userToken, buyCourse)
router.get('/getUserData', getUserData)

module.exports = router