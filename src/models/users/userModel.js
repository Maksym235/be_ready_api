const { Schema, model } = require('mongoose')
const { mongooseError } = require('../../helpers')

const users = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		language: {
			type: String,
			enum: ['en', 'ua'],
			default: 'ua'
		},
		theme: {
			type: String,
			enum: ['light', 'dark'],
			default: 'light'
		},
		token: {
			type: String,
			default: ''
		},
		friendsRequest: {
			type: Array,
			default: []
		},
		tripsRequest: {
			type: Array,
			default: []
		}
	},
	{ versionKey: false, timestamps: true }
)

users.post('save', mongooseError)

const usersModel = model('users', users)

module.exports = usersModel
