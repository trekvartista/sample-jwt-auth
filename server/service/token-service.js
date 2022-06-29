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

	async getToken(refreshToken) {
		const token = await Token.findOne({ where: { refreshToken } });
		if (!token) {
			return null;
		}

		return token;
	}

	async validateAccessToken(token) {
		try {
			const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
			return decoded;
		} catch (e) {
			return null;
		}
	}

	async validateRefreshToken(token) {
		try {
			const decoded = jwt.verify(token, process.env.REFRESH_SECRET_KEY);
			return decoded;
		} catch (e) {
			return null;
		}
	}

	async deleteToken(refreshToken) {
		const token = await Token.destroy({ where: { refreshToken } });
		if (!token) {
			return null;
		}

		return token;
	}
}

module.exports = new TokenService();