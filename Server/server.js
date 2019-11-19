
require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use('/images', express.static('images'))


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

const placesRouter = require('./routes/places')
app.use('/api', placesRouter)

const usersRouter = require('./routes/users')
app.use('/api', usersRouter)

app.listen(3000, () => console.log('server started'))
