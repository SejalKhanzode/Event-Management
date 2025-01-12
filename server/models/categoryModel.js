const mongoose = require("mongoose");

// Define the Tags schema
const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	events: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Event",
		},
	],
});

// Export the Tags model
module.exports = mongoose.model("Category", categorySchema);