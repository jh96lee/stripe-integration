import * as React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

const stripeTestPromise = loadStripe(
	"pk_test_51IWCgNLwUfilcRa7cP7IeZPhyXc0PjB9DqtIj3VgrRLUsb6ZOYsyI6OIHcmxSJKo0ThSOhgtTamVnitySckWFBoZ006i9QETxV"
);

const StripeContainer = () => {
	return (
		<Elements stripe={stripeTestPromise}>
			<CheckoutForm />
		</Elements>
	);
};

export default StripeContainer;
