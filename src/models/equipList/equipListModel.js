const { Schema, model } = require('mongoose')
const { mongooseError } = require('../../helpers')

const equipsList = new Schema(
	{
		tourId: {
			type: Schema.Types.ObjectId,
			ref: 'tours',
			required: true
		},
		list: [
			{
				_id: Schema.Types.ObjectId,
				name: {
					type: String
					//   required: true,
				},
				description: {
					type: String,
					default: ''
				},
				category: {
					type: String
					//   required: true,
				},
				persons: {
					type: Array,
					default: []
				}
			}
		]
	},
	{ versionKey: false, timestamps: true }
)

const new_equips_list = new Schema(
	{
		tourId: {
			type: Schema.Types.ObjectId,
			ref: 'tours',
			required: true
		},
		list: {
			type: Map,
			of: [
				{
					_id: Schema.Types.ObjectId,
					name: {
						type: String
						//   required: true,
					},
					description: {
						type: String,
						default: ''
					},
					category: {
						type: String
						//   required: true,
					},
					persons: {
						type: Array,
						default: []
					}
				}
			]
		}
	},
	{ versionKey: false, timestamps: true }
)

const EquipsListModel = model('equipslists', new_equips_list)

module.exports = EquipsListModel
