const { UserModel } = require('../../models/users')
const path = require('path')
const fs = require('fs/promises')
const avatarsPath = path.join('public', 'avatars')
const { cloudinary } = require('../../helpers')
const changeAvatar = async (req, res) => {
	const { _id: id } = req.user
	const { path: oldPath, filename } = req.file
	// const newPath = path.join(avatarsPath, filename)
	// await fs.rename(oldPath, newPath)
	console.log(oldPath)
	const resultUpload = await cloudinary.uploader.upload(oldPath, {
		folder: 'avatars',
		transformation: {
			height: 150,
			gravity: 'face',
			crop: 'thumb',
			aspect_ratio: 5 / 6,
			zoomed: 0.75
		}
	})
	const avatarURL = resultUpload.secure_url
	// const newAvatar = path.join(
	// 	'https://be-ready-api.vercel.app/',
	// 	'static',
	// 	'avatars',
	// 	filename
	// )

	// const { path: tempUpload } = req.file

	await UserModel.findByIdAndUpdate(
		{ _id: id },
		{
			avatarURL
		}
	)

	res.json({
		code: 200,
		message: 'success update'
	})
}

module.exports = changeAvatar
