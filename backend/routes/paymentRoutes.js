
import express from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripe = Stripe('sk_test_51PaePxCaWz00BLNqJ2TR9WvHtSDqoISg5g7spDLRPTdMmgnjXSLX9HMBhSUPkfOeyOxOMSvwKLtEuiX8w24Lb3hP009xWRc1wu');

router.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || isNaN(amount)) {
            console.error("Invalid or missing 'amount' in request body:", amount);
            return res.status(400).send({ error: 'Valid amount is required' });
        }

        console.log('Creating payment intent for amount:', amount);

        // Convert to cents for Stripe and round to the nearest integer
        const stripeAmount = Math.round((amount * 100) / 272);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: stripeAmount,
            currency: 'usd',
            payment_method_types: ['card'],
        });

        console.log('Payment intent created:', paymentIntent.id);

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).send({ error: error.message });
    }
});

export default router;
