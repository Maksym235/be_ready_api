const { EquipsListModel } = require('../../models/equipList')
const fs = require('fs')
const path = require('path')
const iconsPath = path.join('public', 'category_icons')
const getCategoryIcons = async (req, res) => {
	const icons = fs.readdirSync(iconsPath)
	const newIconsPath = icons.map((icon) => {
		const newPath = path.join(
			'https://be-ready-api.vercel.app',
			'static',
			'category_icons',
			icon
		)
		return newPath
	})
	console.log(newIconsPath)
	res.json({
		code: 200,
		icons: newIconsPath
	})
}

module.exports = getCategoryIcons
