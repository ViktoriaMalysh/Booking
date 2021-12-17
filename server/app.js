const express = require('express')
const app = express()
const projectRoutes = require('./project')
const authRoutes = require('./route')

app.use(require('cors')())

app.use(express.json());

app.use(require('morgan')('dev'))

app.use('/auth', authRoutes)

app.use('/project', projectRoutes)

module.exports = app