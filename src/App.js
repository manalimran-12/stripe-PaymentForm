import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./components/paymentForm";

const stripePromise = loadStripe("pk_test_51Q2UMH04TQ1oiYPQniSmjxNACnBTbzfG3PqOhkodIbXmAEiAI7jcwdj5BKqq3NcYWk99EtCeAbKLefYCG96NTEtx00DZvGbT0x");

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default App;
