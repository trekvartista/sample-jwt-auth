const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { User } = require("../models/index.js");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dto/user-dto");

class UserService {
	
    async register(email, password) {

        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            throw new Error("User with this email already exists")
        }

        const hashPassword = await bcrypt.hash(password, 17)
        const activationLink = uuid.v4()

        const user = await User.create({
            email,
            password: hashPassword,
            activationLink,
        });
		await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(tokens.refreshToken, user.id)

		return { user: userDto, ...tokens }
    }

	async activate(activationLink) {
		const user = await User.findOne({ where: { activationLink } })

		if (!user) {
			throw new Error("User not found, activation link is incorrect")
		}

		user.isActivated = true;
		await user.save()
	}
}

module.exports = new UserService();
