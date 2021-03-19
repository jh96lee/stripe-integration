const express = require("express");
const app = express();
const stripe = require("stripe")(
	"sk_test_51IWCgNLwUfilcRa794KGszz4FzG0dzaa40gSPT5kur1nXLs8uXcDST3awobztdlTyXqpBrseQ7MgMUXKgfZ5kGF500gxlW2t9s"
);
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

app.post("/stripe/charge", cors(), async (req, res) => {
	console.log("body", req.body);

	// REVIEW: these properties are to be expected from the server
	let { amount, id } = req.body;

	try {
		const payment = await stripe.paymentIntents.create({
			amount: amount,
			currency: "USD",
			description: "description",
			payment_method: id,
			confirm: true,
		});

		console.log("payment", payment);

		res.json({
			message: "Payment Successful",
			success: true,
		});
	} catch (error) {
		console.log("error", error);
		res.json({
			message: "Payment Failed",
			success: false,
		});
	}
});

app.listen(8080, () => {
	console.log("Server started...");
});
