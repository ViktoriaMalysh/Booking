const express = require('express')
const router = express.Router()
const projectFunction = require('./controllers/projectFunction')

//localhost:8080/project/create
router.post('/create', projectFunction.create)

//localhost:8080/project/addTime
router.post('/addTime', projectFunction.addTime)

//localhost:8080/project/delete
router.post('/delete', projectFunction.delete)

//localhost:8080/project/show
router.post('/show', projectFunction.show)

//localhost:8080/project/search
router.post('/search', projectFunction.search)

module.exports = router