<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
class WebhookController extends Controller
{

    public function handleWebhook(Request $request)
    {
        // Get the signature from the request headers
        $signature = $request->header('Signature');
    
        // Compute the expected signature using your API secret
        $secret = "secret_d611adf0242a31a1632b54702bf6baddd318ee04d243dd5eac55792899fa76a3";
        $bodyContent = file_get_contents("php://input");
        $computedSignature = hash_hmac('sha256', $bodyContent, $secret);
    
        // Verify the signature
        if (hash_equals($computedSignature, $signature)) {
            // Signature is valid, continue processing
            
            // Parse the JSON data from the request body
            $paymentData = json_decode($bodyContent, true);
    
            // Log the JSON data to the terminal (console)
            dump($paymentData);
    
            // Retrieve the Order based on invoice_number
            $order = Order::where('id', $paymentData['invoice']['invoice_number'])->first();
    
            if ($order) {
                // Check the invoice status and update the order accordingly
                if ($paymentData['invoice']['status'] === 'paid') {
                    $order->update(['status' => 'paid']);
                    // Additional actions for a successful payment...
                } elseif ($paymentData['invoice']['status'] === 'failed') {
                    $order->update(['status' => 'failed']);
                    // Additional actions for a failed payment...
                }
            } else {
                // Order not found, log an error or handle as needed
                Log::error('Order not found for invoice_number: ' . $paymentData['invoice']['invoice_number']);
            }
    
            // Return a response to Chargily to acknowledge receipt of the webhook
            return response()->json(['message' => 'Webhook received successfully']);
        } else {
            // Invalid signature, ignore the request or log the incident
            Log::error('Invalid webhook signature');
            return response()->json(['message' => 'Invalid signature'], 401);
        }
    }
}
