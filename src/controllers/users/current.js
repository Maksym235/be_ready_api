const current = async (req, res) => {
	const {
		token,
		name,
		id,
		email,
		theme,
		language,
		password,
		friends,
		avatarURL
	} = req.user
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

	const user = {
		email,
		id,
		name,
		password,
		theme,
		language,
		friends,
		avatarURL
	}
	res.json({
		user,
		token
	})
}

module.exports = current
