const { UserModel } = require('../../models/users')

const getUserRequests = async (req, res) => {
	const { _id: userId } = req.user
	const user = await UserModel.findById({ _id: userId })
	if (!user) {
		throw new Error(`User not found`)
	}
	const requests = {
		trips: user.tripsRequest ? user.tripsRequest : [],
		friends: user.friendsRequest ? user.friendsRequest : []
	}
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
		code: 200,
		requests
	})
}

module.exports = getUserRequests
