const { Router } = require('express')
const controller = require('../controllers/message/index')
const router = new Router()

router.get('/get-message', controller.getMessage)
router.post('/new-message', controller.newMessage)

module.exports = router