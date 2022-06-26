class UserController {
	async register(req, res, next) {
		try {

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
			res.json(['hello', '123'])
		} catch (e) {
			next(e);
		}
	}

}

module.exports = new UserController();