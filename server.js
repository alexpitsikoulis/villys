const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const { userRouter } = require("./controllers/User.js");

app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/client/build`));

app.use("/api/users", userRouter);

app.get("/*", (req, res) => {
	res.sendFile(`${__dirname}/client/build/index.html`);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`App is listening on PORT ${PORT}`);
});
