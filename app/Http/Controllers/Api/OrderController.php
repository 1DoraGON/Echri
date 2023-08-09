<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\Address;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::all();
        return OrderResource::collection($orders);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'total_price' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
            'user_id' => 'nullable|integer',
            'home_delivery' => 'boolean',
            'status' => 'required|string',
            'price_payed' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
            'payment_image' => 'nullable|string',
            'message' => 'nullable|string',
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'wilaya' => 'required|string',
            'full_address' => 'required|string',
            'phone_number' => 'required|string'
        ]);
        // Extract 'wilaya' and 'full_address' fields into $address variable
        $address_data = [
            'wilaya' => $data['wilaya'],
            'full_address' => $data['full_address']
        ];
        $address = Address::create($address_data);
        // Remove 'wilaya' and 'full_address' fields from $data variable
        unset($data['wilaya']);
        unset($data['full_address']);

        $data['address_id'] = $address->id;
        $order = Order::create($data);
        return new OrderResource($order);
    }

    public function show(Order $order)
    {
        return new OrderResource($order);
    }

    public function update(Request $request, Order $order)
    {
        $data = $request->validate([
            'total_price' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
            'user_id' => 'nullable|integer',
            'home_delivery' => 'boolean',
            'status' => 'required|string',
            'price_payed' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
            'payment_image' => 'nullable|string',
            'message' => 'nullable|string',
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'wilaya' => 'required|string',
            'full_address' => 'required|string',
            'phone_number' => 'required|string'
        ]);

        $order->update($data);
        return new OrderResource($order);
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json(['message' => 'Order deleted successfully']);
    }
}