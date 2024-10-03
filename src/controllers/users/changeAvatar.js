const { UserModel } = require('../../models/users')
const path = require('path')
const fs = require('fs/promises')
const avatarsPath = path.join('public', 'avatars')
const changeAvatar = async (req, res) => {
	const { _id: id } = req.user
	const { path: oldPath, filename } = req.file
	const newPath = path.join(avatarsPath, filename)
	await fs.rename(oldPath, newPath)
	const newAvatar = path.join(
		'https://be-ready-api.vercel.app/',
		'static',
		'avatars',
		filename
	)

	await UserModel.findByIdAndUpdate(
		{ _id: id },
		{
			avatarURL: newAvatar
		}
	)

	res.json({
		code: 200,
		message: 'success update'
	})
}

module.exports = changeAvatar
