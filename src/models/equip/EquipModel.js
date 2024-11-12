const { model, Schema } = require('mongoose')

const equip = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		description: {
			type: String,
			default: ''
		},
		category: {
			type: String,
			required: true
		},
		persons: {
			type: [
				{
					id: String,
					count: Number
				}
			],
			default: []
		}
	},
	{ versionKey: false, timestamps: true }
)

const EquipModel = model('equip', equip)

module.exports = EquipModel
