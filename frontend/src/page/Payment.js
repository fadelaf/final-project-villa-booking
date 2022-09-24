import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useStripe } from "@stripe/react-stripe-js";
import { useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import Swal from "sweetalert2";
import { pay } from "../API";
import { useHistory } from "react-router";
function Payment() {
  const elements = useElements();
  const stripe = useStripe();
  const [pay_num, setPayNum] = useState("");
  const access_token = localStorage.access_token;
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (pay_num === "") {
      Swal.fire({
        icon: "error",
        title: "Invalid",
        text: "Insert Your Payment Number",
      });
    } else {
      try {
        if (elements == null) {
          return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
        });
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Invalid Number",
            text: error.message,
          });
        } else {
          const payt_trx_number = pay_num;
          let data = await pay(access_token, payt_trx_number);

          // console.log(data);

          if (data.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Payment Success",
            });
            history.push("/booking-list");
          } else {
            Swal.fire({
              icon: "error",
              title: "Invalid Payment Number",
            });
          }
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error",
        });
      }
    }
  };

  return (
    <div className="mt-10">
      <div className="flex justify-center p-52 bg-gray-100">
        <div className="p-2 border-2 border-green-200 bg-white rounded-md h-max-content w-96 shadow-md">
          <form onSubmit={handleSubmit}>
            <label for="payment_number">Payment Number</label>
            <div>
              <input
                className="rounded-md border-2 p-1 mt-2      focus:outline-none focus:border-green-500"
                type="text"
                id="payment_number"
                onChange={(e) => setPayNum(e.target.value)}
              />
            </div>
            <label className="mt-3 inline-block" for="">
              Card Number
            </label>
            <div className="rounded-md border-2 p-2 mt-2">
              <CardElement />
            </div>
            <div className="p-2 mt-4 float-right">
              <button
                className="ml-2 bg-green-400 hover:bg-green-600 text-white font-bold py-1 px-5 rounded-full"
                type="submit"
                disabled={!stripe || !elements}
              >
                Pay
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
