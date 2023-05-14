import express from 'express'
import Routes from './routes/routes.js'
import mongoose from 'mongoose'
import cors from 'cors'

mongoose
.connect(`mongodb+srv://smailez:Ap7YqvVR2hpcYWi@mern-test.ngmktsf.mongodb.net/blog?retryWrites=true&w=majority`)
.then(() => console.log('MDB 200'))
.catch((err) => console.log('MBD Error', err))

const app = express()

app.use(cors())

app.use(express.json({ extended: true }))
app.use('/', Routes)
app.use('/uploads', express.static('uploads'))

app.listen(5555, (err) => {
    if (err) {
       return console.log(err)
    }

    console.log('server 200')
})