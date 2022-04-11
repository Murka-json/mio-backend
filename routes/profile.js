const { Router } = require('express')
const controllers = require('../controllers/profile/index')

const router = new Router

router.post('/edit', controllers.edit)
router.post('/password', controllers.editPassword)

module.exports = router