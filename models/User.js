const mongoose = require("./connection.js");
const validator = require("validator");
const isEmpty = require("is-empty");
const User = require("../controllers/User.js");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	address: {
		type: String,
	},
});

const UserCollection = mongoose.model("Sample", UserSchema);

function getAllUsers() {
	return UserCollection.find();
}

function getUserByEmail(email) {
	return UserCollection.findOne({ email });
}

function addUser(user) {
	return UserCollection.create(user);
}

module.exports = {
	getUserByEmail,
	addUser,
	getAllUsers,
};
