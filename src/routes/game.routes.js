const router = require('express').Router()
const gameController = require('../controllers/game.controller')
const authController = require('../controllers/auth.controller')
const dbDaoController = require('../controllers/dbDao.controller')

router.get('/games', gameController.getAll)
router.get('/games/:gameId', gameController.getById)
router.post('/games', gameController.addNewGame)

router.post('/register', authController.register)
router.post('/login', authController.login)

router.get('/db', dbDaoController.getAll)
router.get('/db/:gameId', dbDaoController.getById)
router.post('/db', dbDaoController.addNewGame)

module.exports = router