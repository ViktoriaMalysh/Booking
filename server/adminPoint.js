const express = require('express')
const router = express.Router()
const controller = require('./controllers/admin')

//localhost:8080/admin/showUser
router.get('/showUser', controller.showUser)
 
//localhost:8080/admin/showProj
router.get('/showProj', controller.showProj)

//localhost:8080/admin/searchUser
router.post('/searchUser', controller.searchUser)

//localhost:8080/admin/searchProj
router.post('/searchProj', controller.searchProj)

//localhost:8080/admin/deleteUser
router.post('/deleteUser', controller.deleteUser)

//localhost:8080/admin/deleteProj
router.post('/deleteProj', controller.deleteProj)

module.exports = router 