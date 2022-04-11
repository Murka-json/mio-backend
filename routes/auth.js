const { Router } = require('express')
const controller = require('../controllers/auth/index')

const router = new Router

router.post('/login', controller.login)
router.post('/register', controller.register)
// router.get('/get-user', controller.getUser)

module.exports = router