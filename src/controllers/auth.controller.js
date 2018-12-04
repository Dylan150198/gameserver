
const ApiError = require('../models/apierror.model')
const pool = require('../config/db')

module.exports = {

	register(req, res, next) {
		console.log('AuthController.register called')

		const query = 'INSERT INTO `users` (`firstname`, `lastname`, `email`, `password`) VALUES (?, ? ,?, ?)'

		pool.query(query, 
			[req.body.firstname, req.body.lastname, req.body.email, req.body.password], 
			function (err, rows, fields) {
			// Connection is automatically released when query resolves
			if(err){
				console.log(err.sqlMessage)
				return next(new ApiError(err.sqlMessage, 500))
			}
			res.status(200).json({ result: rows }).end()
		})
	},

	login(req, res, next) {
		console.log('AuthController.register login')

		// For pool initialization, see above
		pool.query("SELECT * FROM games", function (err, rows, fields) {
			// Connection is automatically released when query resolves
			if (err) {
				console.log(err)
				return next(new ApiError(err, 500))
			}
			res.status(200).json({ result: rows }).end()
		})
	}

}