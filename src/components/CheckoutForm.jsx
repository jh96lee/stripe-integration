import * as React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (event) => {
		event.preventDefault();

		const { paymentMethod, error } = await stripe.createPaymentMethod({
			type: "card",
			card: elements.getElement(CardElement),
		});

		if (!error) {
			// TODO: here we are going to send the token to the backend
			// TODO: the id within the paymentMethod object is the token
			const { id } = paymentMethod;

			const response = await axios({
				method: "POST",
				url: "http://localhost:8080/stripe/charge",
				data: {
					// REVIEW: this is 9.99 dollars (default unit for stripe is cents)
					amount: 999,
					id,
				},
			});

			console.log("success", response);
		} else {
			console.log(error.message);
		}
	};

	return (
		<form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
			<CardElement />
			<button>Pay</button>
		</form>
	);
};

export default CheckoutForm;
