const { UserModel } = require('../../models/users')
const { HttpError } = require('../../helpers')
const { JWT_SECRET } = process.env
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
	const authheader = req.headers.authorization
	console.log(req.headers)
	if (!authheader) {
		let err = new Error('You are not authenticated!')
		res.setHeader('WWW-Authenticate', 'Basic')
		err.status = 401
		return next(err)
	}
	const auth = new Buffer.from(authheader.split(' ')[1], 'base64')
		.toString()
		.split(':')
	const login = auth[0]
	const pass = auth[1]
	// const { email, password } = req.body

	const user = await UserModel.findOne({ email: login })
	console.log(user)
	if (!user) {
		throw HttpError(404, 'User not found')
	}
	const validPassword = bcrypt.compareSync(pass, user.password)
	if (!validPassword) {
		throw HttpError(400, 'Invalid password or email')
	}
	const payload = {
		id: user.id
	}

	const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' })
	const resp = await UserModel.findByIdAndUpdate(
		user.id,
		{ token },
		{ new: true }
	)
	res.setHeader('Access-Control-Allow-Credentials', '*')
	// another common pattern
	res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*') //NOTE: I also tried res.setHeader("Access-Control-Allow-Origin", "*"); and didnt work
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

module.exports = login
