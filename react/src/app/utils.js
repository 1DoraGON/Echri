import axios from "axios";
import axiosClient from "../api/axios";

export const calculateCartTotals = (cartItems) => {
  let totalAmount = 0;
  let totalQuantity = 0;

  cartItems.forEach((item) => {
    totalAmount += parseInt(item.price) * item.cartQuantity;
  });
  totalQuantity = cartItems.length;

  return { totalAmount, totalQuantity };
};
// Define your API key and other request data
const API_KEY = 'YOUR_API_KEY';
const checkoutData = {
  client: 'Your Client Name',
  client_email: 'client@example.com',
  invoice_number: '123456', // Replace with your order number
  amount: 100, // Replace with your order total amount
  discount: 10, // Replace with your discount percentage
  back_url: 'https://your-website.com/checkout/success', // Replace with your success URL
  webhook_url: 'https://your-website.com/api/payment-webhook', // Replace with your webhook URL
  mode: 'EDAHABIA', // or 'CIB', choose the payment method
  comment: 'Payment for Order #123456', // Replace with your payment description
};
export const chargilyPay = async (API_KEY, checkoutData) => {
  try {
    // Make the POST request to create a payment
    const response = await axiosClient.post('/api/proxy-to-chargily', checkoutData, {
      headers: {
        'X-Authorization': API_KEY,
        'Accept': 'application/json',
      },
    });

    // Handle the response
    if (response.status === 201) {
      // Payment created successfully
      const checkoutUrl = response.data.checkout_url;
      // Redirect the user to the checkout URL
      window.location.href = checkoutUrl;
    } else {
      console.error('Payment creation failed');
    }
  } catch (error) {
    console.error('Error creating payment:', error);
  }
}