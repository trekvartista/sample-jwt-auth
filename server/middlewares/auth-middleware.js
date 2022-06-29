const ApiError = require("../exceptions/api-error");
const tokenService = require("../service/token-service");


module.exports = async function (req, res, next) {
	try {
		const authHeader = req.headers.authorization
		if (!authHeader) {
			return next(ApiError.UnauthorizedUser());
		}
		const accessToken = authHeader.split(" ")[1]
		if (!accessToken) {
			return next(ApiError.UnauthorizedUser());
		}

		const userData = await tokenService.validateAccessToken(accessToken)
		if (!userData) {
			return next(ApiError.UnauthorizedUser());
		}

		req.user = userData
		next()

	} catch (e) {
		return next(ApiError.UnauthorizedUser());
	}
}