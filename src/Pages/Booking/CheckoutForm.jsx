// PaymentForm.js
import  { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Paytm } from 'react-native-paytm-checkout';
import { GooglePayButton } from 'react-native-google-pay';
import { PhonePeButton } from 'react-native-phonepe';

const stripePromise = loadStripe('your-publishable-key-here');

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleStripePayment = async () => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setPaymentStatus(error.message);
    } else {
      setPaymentStatus('Stripe payment successful!');
      console.log('[PaymentMethod]', paymentMethod);
    }
  };

  const handlePaytmPayment = async () => {
    try {
      const response = await Paytm.startTransaction({
        orderId: 'your-order-id',
        amount: 'amount-to-pay',
        enableLogging: true,
      });

      if (response.status === 'SUCCESS') {
        setPaymentStatus('Paytm payment successful!');
        console.log('[PaytmResponse]', response);
      } else {
        setPaymentStatus(response.message);
      }
    } catch (error) {
      setPaymentStatus(error.message);
    }
  };

  const handleGooglePayPayment = async () => {
    try {
      const response = await GooglePayButton.pay('your-order-id', 'amount-to-pay');

      if (response.status === 'SUCCESS') {
        setPaymentStatus('Google Pay payment successful!');
        console.log('[GooglePayResponse]', response);
      } else {
        setPaymentStatus(response.message);
      }
    } catch (error) {
      setPaymentStatus(error.message);
    }
  };

  const handlePhonePePayment = async () => {
    try {
      const response = await PhonePeButton.pay('your-order-id', 'amount-to-pay');

      if (response.status === 'SUCCESS') {
        setPaymentStatus('PhonePe payment successful!');
        console.log('[PhonePeResponse]', response);
      } else {
        setPaymentStatus(response.message);
      }
    } catch (error) {
      setPaymentStatus(error.message);
    }
  };

  return (
    <div className="payment-form">
      <h3>Choose Your Payment Method</h3>
      <button onClick={handleStripePayment} disabled={!stripe}>Pay with Stripe</button>
      <button onClick={handlePaytmPayment}>Pay with Paytm</button>
      <button onClick={handleGooglePayPayment}>Pay with Google Pay</button>
      <button onClick={handlePhonePePayment}>Pay with PhonePe</button>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default PaymentForm;
