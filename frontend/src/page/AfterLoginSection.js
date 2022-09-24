import React from "react";
import { Switch } from "react-router";
import { Route } from "react-router";
import {
  Profile,
  VillaDetail,
  Cart,
  BookingForm,
  BookingList,
  Payment,
  Review,
} from ".";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
function AfterLoginSection({ login }) {
  const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

  return (
    <Switch>
      <Route exact path="/profile" component={Profile}></Route>
      <Route exact path="/detail/:id" component={VillaDetail}>
        <VillaDetail login={login} />
      </Route>
      <Route exact path="/cart" component={Cart}></Route>
      <Route exact path="/booking-form/:cartId" component={BookingForm}></Route>
      <Route exact path="/booking-list" component={BookingList}></Route>
      <Route exact path="/payment" component={Payment}>
        <Elements stripe={stripePromise}>
          <Payment />
        </Elements>
      </Route>
      <Route exact path="/review/:orderId" component={Review}></Route>
    </Switch>
  );
}

export default AfterLoginSection;
