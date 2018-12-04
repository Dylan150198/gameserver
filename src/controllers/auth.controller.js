
const ApiError = require('../models/apierror.model')
const pool = require('../config/db')

module.exports = {

	register(req, res, next) {
		console.log('AuthController.register called')
		// insert statement
		const query = 'INSERT INTO `users` (`firstname`, `lastname`, `email`, `password`) VALUES (?, ? ,?, ?)'
		pool.query(query, 
			[req.body.firstname, req.body.lastname, req.body.email, req.body.password], 
			function (err, rows, fields) {
			// Connection is automatically released when query resolves
			if(err){
				console.log(err.sqlMessage)
				// print bad request
				return next(new ApiError(err.sqlMessage, 400))
			}
			res.status(200).json({ result: rows }).end()
		})
	},
	login(req, res, next) {
		console.log('AuthController.login called')
		const query = 'SELECT * FROM users WHERE firstname = ? AND password = ?';
		pool.query(query, 
			[req.body.firstname, req.body.password], 
			function (err, rows, fields) {
			// Connection is automatically released when query resolves
			if(err){
				console.log(err.sqlMessage)
				return next(new ApiError(err.sqlMessage, 400))
			}else if (rows != 0){
				res.status(200).json({Server: "Login 200."}).end()
			}else{
				return next(new ApiError("Unauthorized", 401))
			}
		})
	}
}