import React from "react";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";

import axios from 'axios'

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#303238",
            fontSize: "16px",
            fontFamily: "sans-serif",
            fontSmoothing: "antialiased",
            "::placeholder": {
                color: "#CFD7DF"
            }
        },
        invalid: {
            color: "#e5424d",
            ":focus": {
                color: "#303238"
            }
        }
    }
};

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async event => {
        event.preventDefault();

        // handle payment request
    };

    const pay = async () => {
        try {
            const headers = {
                'Access-Control-Allow-Origin' : 'http://localhost:8000'
            };
            axios.post('http://localhost:8000/payment-intent' ,headers).then(async response => {
                console.log(response)
                // const data = await response.json();
                const cardElement = elements.getElement(CardElement);
                const confirmPayment = await stripe.confirmCardPayment(
                    response.data.client_secret,
                    {payment_method: {card: cardElement}}
                );
                console.log(confirmPayment);
                const {paymentIntent} = confirmPayment;
                if (paymentIntent.status === "succeeded") alert(`Payment successful!`);
                else alert(`Payment failed!`);
            })
        } catch (err) {
            console.error(err);
            alert("There was an error in payment");
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement options={CARD_ELEMENT_OPTIONS} />
                <button className="btn-pay" onClick={pay}>Buy Now</button>
            </form>
        </div>
    );

}

export default CheckoutForm