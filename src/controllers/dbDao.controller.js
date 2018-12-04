const ApiError = require('../models/apierror.model')
const pool = require('../config/db')
const Game = require('../models/game.model')

module.exports = {
	getAll(req, res, next) {
        console.log('dbDao.controller getAll called')
        // select statement
		const query = 'SELECT * FROM games';
		pool.query(query, function (err, rows, fields) {
			// Connection is automatically released when query resolves
			if(err){
                 // print 400 bad request
				console.log(err.sqlMessage)
				return next(new ApiError(err.sqlMessage, 400))
			}
			res.status(200).json({ result: rows }).end()
		})
	},
	getById(req, res, next) {
        console.log('dbDao.controller getById called')
        // select statement
		const query = 'SELECT * FROM games WHERE id = ?';
		pool.query(query, [req.params.gameId], 
			function (err, rows, fields) {
			// Connection is automatically released when query resolves
			if(err){
                // print 400 bad request
				console.log(err.sqlMessage)
				return next(new ApiError(err.sqlMessage, 400))
            }
            // return requested game by id as response
			res.status(200).json({result: rows}).end()
		})
    },
    addNewGame(req, res, next){
        console.log('dbDao.controller addNewGame called')
        // New date 
        let lastUpdated = new Date();
        // New game with request body values
        let game = new Game(req.body.title, req.body.producer, req.body.year, req.body.type)
        console.dir(game)
        // Insert statement
        const query = 'INSERT INTO `games` (`title`, `producer`, `year`, `type`, `lastupdated`) VALUES (?, ?, ?, ?, ?)'
        pool.query(query, [game.name, game.producer, game.year, game.type, lastUpdated], 
            function (err, rows, fields) {
            // Connection is automatically released when query resolves
			if(err){
                // print bad request (400)
				console.log(err.sqlMessage)
				return next(new ApiError(err.sqlMessage, 400))
            }
            // print ok message (201) inserted.
            res.status(200).json({response: "201 Inserted"}).end()
        })
    },
    updateGame(req, res, next){
        console.log('dbDao.controller update called')
        // TO DO 
    },
    deleteGame(req, res, next){
        console.log('dbDao.controller delete called')
        // TO DO 
    }
}