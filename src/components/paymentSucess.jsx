import React from "react";
import { Button, Typography, Box } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PaymentSuccess = ({ paymentId, onBackToPayment }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                textAlign: 'center',
            }}
        >
            <Box
                sx={{
                    padding: 4,
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(173, 216, 230, 0.5)',
                    maxWidth: 400,
                    width: '100%',
                    bgcolor: 'white',
                }}
            >
                <CheckCircleIcon sx={{ fontSize: 60, color: '#1976d2' }} />
                <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold' }}>
                    Payment Successful
                </Typography>
                <Typography sx={{ mt: 1 }}>
                    Thank you for your payment!
                </Typography>
                <Typography sx={{ mt: 1, fontStyle: 'italic' }}>
                    Payment ID: {paymentId}
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        mt: 3,
                        backgroundColor: '#1976d2',
                        '&:hover': {
                            backgroundColor: '#155a9a',
                        },
                    }}
                    onClick={onBackToPayment}
                >
                    Go Back
                </Button>
            </Box>
        </Box>
    );
};

export default PaymentSuccess;
