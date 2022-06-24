const router = require('express').Router()
const { 
    signUp, 
    signIn, 
    signOut, 
    createCourse, 
    addVideos,
    getAllInstructors
     } = require('../controllers/instructorApiController')
 
const { instructorToken } = require('../middlewares/authenticate')
const upload = require('multer')
 

router.post('/signUp', signUp)
router.post('/signIn', signIn)
router.get('/', getAllInstructors)
router.delete('/signOut', instructorToken, signOut)
router.post('/createCourse', instructorToken, createCourse)
//router.post('/:id/createCourse', instructorToken, createCourse)
router.post('/addVideo/:courseId',upload().single('video'), instructorToken, addVideos)



module.exports = router