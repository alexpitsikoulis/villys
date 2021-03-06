const express = require("express");
const userRouter = express.Router();
const userApi = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const keys = require("../config/keys");

userRouter.get("/", (req, res) => {
	userApi
		.getAllUsers()
		.then((users) => {
			res.json(users);
		})
		.catch((err) => {
			res.json(err);
		});
});

userRouter.post("/register", (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	if (!isValid) {
		return res.json(400).json(errors);
	}

	userApi
		.getUserByEmail(req.body.email)
		.then((user) => {
			if (user) {
				return res.status(400).json({ email: "Email already in use" });
			} else {
				const newUser = {
					name: req.body.name,
					email: req.body.email,
					password: req.body.password,
					address: req.body.address,
				};

				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw err;
						newUser.password = hash;
						userApi
							.addUser(newUser)
							.then((user) => {
								res.json(user);
							})
							.catch((err) => {
								res.json(err);
							});
					});
				});
			}
		})
		.catch((err) => {
			res.json(err);
		});
});

userRouter.post("/login", (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	userApi.getUserByEmail(email).then((user) => {
		if (!user) {
			return res.status(404).json({ emailnotfound: "Email not found" });
		}

		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				const payload = {
					id: user.id,
					name: user.name,
				};

				jwt.sign(
					payload,
					keys.secretOrKey,
					{ expiresIn: 31556926 },
					(err, token) => {
						res.json({
							success: true,
							token: `Bearer ${token}`,
						});
					}
				);
			} else {
				return res
					.status(404)
					.json({ passwordincorrect: "Password incorrect" });
			}
		});
	});
});

module.exports = {
	userRouter,
};
