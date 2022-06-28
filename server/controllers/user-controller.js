const { User } = require("../models");
const userService = require("../service/user-service");

class UserController {
	async register(req, res, next) {
		try {
			const { email, password } = req.body;
			const userData = await userService.register(email, password);
		
			res.cookie('refreshToken', userData.refreshToken, {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true});

			return res.json(userData);
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