const { Schema, model } = require('mongoose')
const { mongooseError } = require('../../helpers')
const { boolean } = require('joi')

const tours = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		users: {
			type: [{ type: Schema.Types.ObjectId, ref: 'user' }],
			required: true
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			required: true
		},
    duration: {
      type: Number,
      required: true
    },
		equipList: [{ type: Schema.Types.Array, ref: 'equip' }]
	},
	{ versionKey: false, timestamps: false }
)
tours.post('save', mongooseError)

const ToursModel = model('tours', tours)

module.exports = ToursModel
