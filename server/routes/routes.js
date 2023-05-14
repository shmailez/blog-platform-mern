import express from 'express'
import {
    getOnce,
    postLogin,
    getLogin, 
    getMe
} from '../controllers/Usercontroller.js'
import { 
    createPost, 
    getAllPosts,
    // getOne, 
    getOnePosts, 
    removeOnePosts,
    updatePost
} from '../controllers/PostController.js'
import { registerValidation, LoginValidation, postValidation } from '../validation/auth.js'
import checkAuth from '../utils/checkAuth.js'
import multer from 'multer'
import handleValidationErrors from '../utils/handleValidationErrors.js'


const route = express.Router()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    }, 
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
}) 

const upload = multer({ storage })

route.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

route.get('/uploads', express.static('uploads'))

route.get('/', getOnce)
route.post('/registration', registerValidation, handleValidationErrors, postLogin)
route.post('/login', LoginValidation, handleValidationErrors, getLogin)
route.get('/me', checkAuth, getMe)

route.get('/posts', getAllPosts)
route.get('/posts/:id', getOnePosts)
// route.get('/post/:id', getOne)
route.post('/posts', checkAuth, postValidation, createPost)
route.delete('/posts/:id', checkAuth, removeOnePosts)
route.patch('/posts/:id', checkAuth, updatePost)

export default route