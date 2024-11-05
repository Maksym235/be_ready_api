const { UserModel } = require('../../models/users')
const { HttpError, cloudinary } = require('../../helpers')
const bcrypt = require('bcrypt')

const register = async (req, res) => {
	const { name, email, password } = req.body
	const user = await UserModel.findOne({ email: email })
	const defaultAvatarData = await cloudinary.api.resources_by_tag('default')
	const cloudinaryURL = defaultAvatarData.resources[0].secure_url

	if (user) {
		throw HttpError(409, 'user already exists')
	}
	const hashPassword = await bcrypt.hash(password, 10)
	const newUser = {
		...req.body,
		avatarURL: cloudinaryURL,
		avatarName: 'default_user',
		tripsRequest: [],
		friendsRequest: [],
		friends: [],
		password: hashPassword
	}
	const resp = await UserModel.create(newUser)
	res.setHeader('Access-Control-Allow-Credentials', true)
	res.setHeader('Access-Control-Allow-Origin', '*')
	// another common pattern
	// res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET,OPTIONS,PATCH,DELETE,POST,PUT'
	)
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
	)
	if (req.method === 'OPTIONS') {
		res.status(200).end()
		return
	}
	res.json({
		code: 201,
		message: 'registered successfully',
		user: {
			name: resp.name,
			email: resp.email,
			id: resp._id,
			language: resp.language,
			theme: resp.theme,
			avatarURL: resp.avatarURL,
			avatarName: resp.avatarName,
			tripsRequest: resp.tripsRequest,
			friendsRequest: resp.friendsRequest,
			friends: resp.friends
		}
	})
}

module.exports = register
