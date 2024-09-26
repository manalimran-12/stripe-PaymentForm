import React, { useState } from "react";
import { Button, TextField, CircularProgress, Typography, Box } from "@mui/material";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import {
    setName,
    setEmail,
    setLoading,
    setErrorMessage,
    setSuccessMessage,
    resetForm,
} from "../redux/slices/paymentSlice";
import PaymentSuccess from '../components/paymentSucess';  

const PaymentForm = () => {
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();

    const [isCardComplete, setIsCardComplete] = useState(false);
    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
    const [paymentId, setPaymentId] = useState("");

    const { name, email, loading, errorMessage, successMessage } = useSelector(
        (state) => state.payment
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        dispatch(setErrorMessage(null));
        dispatch(setSuccessMessage(""));

        if (!stripe || !elements) {
            dispatch(setErrorMessage("Stripe has not loaded yet."));
            dispatch(setLoading(false));
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: {
                name,
                email,
            },
        });

        if (error) {
            dispatch(setErrorMessage(error.message));
            dispatch(setLoading(false));
            return;
        }

        dispatch(setSuccessMessage(`Payment successful! ID: ${paymentMethod.id}`));
        setPaymentId(paymentMethod.id);
        setIsPaymentSuccessful(true);
        setTimeout(() => {
            dispatch(resetForm());
        }, 3000);

        dispatch(setLoading(false));
    };

    const handleCardChange = (event) => {
        if (event.error) {
            dispatch(setErrorMessage(event.error.message));
        } else {
            dispatch(setErrorMessage(null));
        }

        setIsCardComplete(event.complete);
    };

    const handleBackToPayment = () => {
        setIsPaymentSuccessful(false);
    };

    if (isPaymentSuccessful) {
        return <PaymentSuccess paymentId={paymentId} onBackToPayment={handleBackToPayment} />;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Box 
                sx={{ 
                    maxWidth: 600,
                    width: '100%',
                    margin: '0 auto', 
                    padding: 4, 
                    border: '1px solid gray',  
                    boxShadow: '0 4px 20px rgba(173, 216, 230, 0.5)', 
                    borderRadius: '8px' 
                }}
            >
                <Typography variant="h3" sx={{ textAlign: 'center', mb: 2, color:"#1976d2", fontWeight:"bold"}}>
                    PAYMENT FORM
                </Typography>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => dispatch(setEmail(e.target.value))}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Cardholder Name"
                        value={name}
                        onChange={(e) => dispatch(setName(e.target.value))}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <Box
                        sx={{
                            border: '1px solid rgba(0, 0, 0, 0.23)', 
                            borderRadius: '4px',
                            padding: '18.5px 14px',
                            fontSize: '16px',
                            marginBottom: '16px',
                            '& .StripeElement': {
                                fontSize: '16px', 
                                width: '100%',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                        }}
                    >
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: "16px",
                                        color: "#424770",
                                        "::placeholder": {
                                            color: "#aab7c4",
                                        },
                                    },
                                    invalid: {
                                        color: "#9e2146",
                                    },
                                },
                            }}
                            onChange={handleCardChange}
                        />
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        {loading ? (
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                Processing...
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: "white",
                                        marginLeft: 2,
                                    }}
                                />
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={!stripe || !name || !email || !isCardComplete}
                            >
                                Pay
                            </Button>
                        )}
                    </Box>

                    {errorMessage && <Typography sx={{ color: 'red', mt: 1 }}>{errorMessage}</Typography>}
                    {successMessage && <Typography sx={{ color: 'green', mt: 1 }}>{successMessage}</Typography>}
                </form>
            </Box>
        </Box>
    );
};

export default PaymentForm;
