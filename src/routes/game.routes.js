const router = require('express').Router()
const gameController = require('../controllers/game.controller')
const authController = require('../controllers/auth.controller')

router.get('/games', gameController.getAll)
router.get('/games/:gameId', gameController.getById)
router.post('/games', gameController.addNewGame)

router.post('/register', authController.register)
router.post('/login', authController.login)


module.exports = router