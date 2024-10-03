const multer = require('multer')
const path = require('path')
const destination = path.resolve('temp')
const { cloudinary } = require('../helpers')

const storage = multer.diskStorage({
	cloudinary: cloudinary,
	filename: (req, file, cb) => {
		const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9)
		const newName = `${uniquePrefix}_${file.originalname}`
		cb(null, newName)
	}
})
const uploads = multer({
	storage
})

module.exports = uploads
