import { validationResult } from 'express-validator'
import UserModel from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getOnce = (req, res) => {
   res.send('hee without async but with nodemon')
}

export const postLogin = async (req, res) => {
     try {
        // const errors = validationResult(req)
        // if (!errors.isEmpty()) {
        //     return res.status(400).json(errors.array())
        // }

        //шифрование пароля
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModel({
            fullName: req.body.fullName,
            email: req.body.email,
            passwordHash: hash,
            avatarUrl: req.body.avatarUrl,
        })

        const user = await doc.save()

        const token = jwt.sign(
            {
                _id: user._id
            }, 
            'secret123',
            {
                expiresIn: "30d"
            }
        )

        const { passwordHash, ...userData} = user._doc

        console.log('user >', user, 'token>', token)
        res.json({...userData, token})
     } catch (err) {
        console.log(err)
        res.status(500).json({
            message: ('регистрация не удалась' , err)
        })
     }
}

export const getLogin = async (req,res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })

        if( !user ) {
            return res.status(404).json({
                message: ('пользователь не найден')
            })
        }

        const isValidHash = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if( !isValidHash ) {
            return res.status(404).json({
                message: ('данные неверны')
            })
        }

        const token = jwt.sign(
            {
                _id: user._id
            }, 
            'secret123',
            {
                expiresIn: "30d"
            }
        )

        const {passwordHash, ...userData} = user._doc

        res.json({...userData, token})
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }

        const {passwordHash, ...userData} = user._doc

        res.json({...userData})
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

