<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ProxyController extends Controller
{

    public function proxyToChargily(Request $request)
    {

        $response = Http::withHeaders([
            'X-Authorization' => 'api_KlPhDoOuNEZFw5gJ17ZszliXvRIoNm3NSArtpe2qJ2XgyIlXpikhjZ9Ob2PmeJt7', // Replace with your actual API key
            'Accept' => 'application/json',
        ])->post('https://epay.chargily.com.dz/api/invoice', $request->all());
    

        // Return the response to the frontend
        return $response->json();
    }
    
}
