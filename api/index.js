const express = require('express')
const cors = require('cors')
require('dotenv').config()
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')
const mongoose = require('mongoose')
const { DB_HOST, PORT } = process.env
const app = express()
const startRouter = require('../src/routes/start')
const authRouter = require('../src/routes/Auth')
const toursRouter = require('../src/routes/tours')
const equipsRouter = require('../src/routes/equips')
const equipListRouter = require('../src/routes/equipList')
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
const sorsOpt = {
	origin: '*',
	optionsSuccessStatus: 200
}
app.use(express.json())
app.use(cors(sorsOpt))
app.use('/start', startRouter)
app.use('/auth', authRouter)
app.use('/tours', toursRouter)
app.use('/equip', equipsRouter)
app.use('/equipList', equipListRouter)
mongoose.set('strictQuery', true)

mongoose
	.connect(DB_HOST)
	.then(() => {
		app.listen(PORT, () => {
			console.log('server listening on port 8080')
		})
	})
	.catch((err) => {
		console.log(err.message)
		process.exit(1)
	})

module.exports = app
