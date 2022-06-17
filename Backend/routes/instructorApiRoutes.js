const router = require('express').Router()
const { signUp, signIn, signOut, createCourse, addVideos } = require('../controllers/instructorApiController')
const { instructorToken } = require('../middlewares/authenticate')
const upload = require('multer')

router.post('/instructor/signUp', signUp)
router.post('/instructor/signIn', signIn)
router.delete('/instructor/signOut', instructorToken, signOut)
router.post('/createCourse', instructorToken, createCourse)
router.post('/addVideo/:courseId',upload().single('video'), instructorToken, addVideos)

module.exports = router