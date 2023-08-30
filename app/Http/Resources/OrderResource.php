<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Access the 'products' relationship and customize each product's output
        $products = $this->whenLoaded('products', function () {
            return $this->products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'description' => $product->pivot->description,
                    'quantity' => $product->pivot->quantity,
                    'total_price' => $product->pivot->quantity * $product->price,
                    'image' => $product->main_image,
                ];
            });
        });
        // Access the 'address' relationship and include 'wilaya' and 'full_address'
        $address = $this->whenLoaded('address', function () {
            return [
                'wilaya' => $this->address->wilaya,
                'full_address' => $this->address->full_address,
            ];
        });

        return [
            'id' => $this->id,
            'total_price' => $this->total_price,
            'user_id' => $this->user_id,
            'home_delivery' => $this->home_delivery,
            'status' => $this->status,
            'price_payed' => $this->price_payed,
            'payment_image' => $this->payment_image,
            'message' => $this->message,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'phone_number' => $this->phone_number,
            'products' => $products,
            'address' => $address, // Include the customized address data
            'created_at' => $this->created_at->format('d F Y'),
        ];
    }
}