const { UserModel } = require('../../models/users')
const { HttpError, cloudinary } = require('../../helpers')
const { JWT_SECRET } = process.env
const jwt = require('jsonwebtoken')

const googleAuth = async (req, res) => {
	const { email, avatarURL, avatarName } = req.body
	const user = await UserModel.findOne({ email: email })
	const defaultAvatarData = await cloudinary.api.resources_by_tag('default')
	const cloudinaryURL = defaultAvatarData.resources[0].secure_url
	console.log(user)
	if (!user) {
		const newUser = {
			...req.body,
			avatarURL:
				avatarURL.length > 0 && avatarURL !== null ? avatarURL : cloudinaryURL,
			avatarName:
				avatarURL.length > 0 && avatarURL !== null
					? avatarName
					: 'default_user',
			tripsRequest: [],
			friendsRequest: [],
			friends: []
		}
		const respRegister = await UserModel.create(newUser)
		const payload = {
			id: respRegister.id
		}
		const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' })
		const resp = await UserModel.findByIdAndUpdate(
			respRegister.id,
			{ token },
			{ new: true }
		)
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
			token: resp.token,
			user: {
				name: resp.name,
				email: resp.email,
				id: resp._id,
				language: resp.language,
				theme: resp.theme
			}
		})
	} else {
		const payload = {
			id: user.id
		}

		const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' })
		const resp = await UserModel.findByIdAndUpdate(
			user.id,
			{ token },
			{ new: true }
		)
		res.json({
			code: 200,
			message: 'Login successful',
			token: resp.token,
			user: {
				name: resp.name,
				email: resp.email,
				id: resp._id,
				language: resp.language,
				theme: resp.theme
			}
		})
	}
}

module.exports = googleAuth
