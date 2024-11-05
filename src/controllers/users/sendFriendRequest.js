const { UserModel } = require('../../models/users')
const { HttpError } = require('../../helpers')
const sendFriendRequest = async (req, res) => {
	const { _id: currentUser, name, avatarURL } = req.user
	const { userid } = req.body
	const user = await UserModel.findById({ _id: userid })
	if (!user) {
		throw HttpError(404, 'User not found')
	}
	const index = user.friendsRequest.findIndex(
		(el) => String(el.id) === String(currentUser)
	)
	const indexInFriends = user.friends.findIndex(
		(el) => String(el._id) === String(currentUser)
	)
	if (index !== -1) {
		throw HttpError(400, 'Request already sent')
	}
	if (String(userid) === String(currentUser)) {
		throw HttpError(400, 'you can`t send to yourself request')
	}
	if (indexInFriends !== -1) {
		throw HttpError(400, 'User is already in friends list')
	}
	await UserModel.findByIdAndUpdate(
		{ _id: userid },
		{
			$push: { friendsRequest: { id: currentUser, name, avatar: avatarURL } }
		}
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
		code: 200,
		message: 'request sended successfully'
	})
}

module.exports = sendFriendRequest
