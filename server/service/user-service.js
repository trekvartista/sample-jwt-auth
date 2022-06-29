const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { User } = require("../models/index.js");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dto/user-dto");
const ApiError = require("../exceptions/api-error.js");

class UserService {
	
    async register(email, password) {

        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
			throw ApiError.BadRequest("User with this email already exists")
            // throw new Error("User with this email already exists")
        }

        const hashPassword = await bcrypt.hash(password, 17)
        const activationLink = uuid.v4()

        const user = await User.create({
            email,
            password: hashPassword,
            activationLink,
        });
		await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(tokens.refreshToken, user.id)

		return { user: userDto, ...tokens }
    }

	async login(email, password) {

		const user = await User.findOne({ where: { email } })

		if (!user) {
			throw ApiError.BadRequest("User with this email does not exist")
		}

		const comparePassword = await bcrypt.compare(password, user.password)
		if(!comparePassword) {
			throw ApiError.BadRequest("Password is incorrect")
		}

		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(tokens.refreshToken, user.id)

		return { user: userDto, ...tokens }
	}

	async logout(refreshToken) {

		const token = await tokenService.deleteToken(refreshToken)
		return token
	}

	async refresh(refreshToken) {

		if (!refreshToken) {
			throw ApiError.UnauthorizedUser()
		}

		// const user = await User.findOne({ where: { refreshToken } })
		const userData = await tokenService.validateRefreshToken(refreshToken)
		const db_token = await tokenService.getToken(refreshToken)

		if (!userData || !db_token) {
			throw ApiError.UnauthorizedUser()
		}

		const user = await User.findOne({ where: { id: userData.id } })
		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(tokens.refreshToken, user.id)

		return { user: userDto, ...tokens }
	}

	async activate(activationLink) {
		const user = await User.findOne({ where: { activationLink } })

		if (!user) {
			throw ApiError.BadRequest("User not found, activation link is incorrect")
		}

		user.isActivated = true;
		await user.save()
	}
}

module.exports = new UserService();
