const jwt = require('jsonwebtoken');
const { Token } = require('../models/index.js');

class TokenService {

	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, { expiresIn: '30m' });
		const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, { expiresIn: '30d' });

		return { accessToken, refreshToken };
	}

	async saveToken(refreshToken, userId) {
		const tokenData = await Token.findOne({ where: { userId } });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}

		try {
			const token = await Token.create({ userId: userId, refreshToken });
			
			return token;
		} catch (e) {
			console.log(e);
		}
	}
}

module.exports = new TokenService();