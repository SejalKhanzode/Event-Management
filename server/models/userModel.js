const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true, 
	},
    accountType: {
        type: String,
        default: ["Organizer", "Guest", "Admin"],
    },
	events: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Event",
		},
	],
    
})

const userModel = mongoose.model("user", userSchema)
module.exports = userModel