<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
class WebhookController extends Controller
{
    public function handleChargilyPayWebhook(Request $request)
    {
        // Validate the webhook request
        $validator = Validator::make($request->all(), [
            // Define validation rules here based on the webhook payload
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Invalid webhook request'], 400);
        }

        // Verify the webhook signature
        $signature = $request->header('Signature');
        $computedSignature = hash_hmac('sha256', $request->getContent(), 'YOUR_API_SECRET');

        if (!hash_equals($computedSignature, $signature)) {
            return response()->json(['error' => 'Invalid signature'], 401);
        }

        // Handle the webhook data (payment confirmation or failure)
        $payload = $request->all();

        if ($payload['invoice']['status'] === 'paid') {
            // Handle payment confirmation
            // Update your application's records, send notifications, etc.
        } elseif ($payload['invoice']['status'] === 'failed') {
            // Handle payment failure
            // Update your application's records, send notifications, etc.
        }

        return response()->json(['message' => 'Webhook handled successfully'], 200);
    }


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
            dump($paymentData); // or dd($paymentData) to dump and terminate script
    
            // Check the invoice status and take appropriate actions
            if ($paymentData['invoice']['status'] === 'paid') {
                // Invoice is paid, confirm the order or perform any necessary actions
                // Your code here...
            } elseif ($paymentData['invoice']['status'] === 'failed') {
                // Payment failed, handle the failure scenario
                // Your code here...
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
