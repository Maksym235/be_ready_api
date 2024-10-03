const { UserModel } = require('../../models/users')
const path = require('path')
const { cloudinary } = require('../../helpers')
const resetToDefaultAvatar = async (req, res) => {
	const { _id: userId } = req.user
	const avatarsPath = path.join('public', 'avatars')
	const newPath = path.join(avatarsPath, 'default_user.png')
	const resultUpload = await cloudinary.uploader.upload(newPath, {
		folder: 'avatars'
		// transformation: {
		// 	height: 120,
		// 	gravity: 'face',
		// 	crop: 'thumb',
		// 	aspect_ratio: 5 / 6,
		// 	zoomed: 0.75
		// }
	})
	const cloudinaryURL = resultUpload.secure_url
	const avatarName = resultUpload.original_filename
	console.log(resultUpload)
	await UserModel.findByIdAndUpdate(
		{ _id: userId },
		{
			avatarURL: cloudinaryURL,
			avatarName
		}
	)

	res.json({
		code: 200,
		message: 'Avatar reset to default'
	})
}

module.exports = resetToDefaultAvatar
