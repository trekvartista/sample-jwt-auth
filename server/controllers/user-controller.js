const { User } = require("../models");
const userService = require("../service/user-service");
const { validationResult } = require('express-validator');
const ApiError = require("../exceptions/api-error");

class UserController {
	async register(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest("Validation error", errors.array()))
			}
			const { email, password } = req.body
			const userData = await userService.register(email, password)
		
			res.cookie('refreshToken', userData.refreshToken, {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true})

			return res.json(userData)
		} catch (e) {
			next(e);
		}
	}
	async login(req, res, next) {
		try {

		} catch (e) {
			next(e);
		}
	}
	async logout(req, res, next) {
		try {

		} catch (e) {
			next(e);
		}
	}
	async activate(req, res, next) {
		try {
			const activationLink = req.params.link
			await userService.activate(activationLink)

			// express allows to redirect from a server to client link
			return res.redirect(process.env.CLIENT_URL)
		} catch (e) {
			next(e);
		}
	}
	async refresh(req, res, next) {
		try {

		} catch (e) {
			next(e);
		}
	}
	async getUsers(req, res, next) {
		try {
			const users = await User.findAll()
			return res.json(users)
		} catch (e) {
			next(e);
		}
	}

}

module.exports = new UserController();