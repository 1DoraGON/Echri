<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\Address;
use App\Models\Product;
use App\Rules\PaymentMethodValidationRule;
use App\Rules\StatusValidationRule;
use Illuminate\Support\Facades\Auth;

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
            'user_id' => 'required|integer',
            'home_delivery' => 'boolean',
            'status' => 'required|string',
            'price_payed' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
            'payment_image' => 'nullable|string',
            'payment_method' => 'required|string',
            'message' => 'nullable|string',
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'wilaya' => 'required|integer',
            'full_address' => 'required|string',
            'phone_number' => 'required|numeric',
            'products' => 'required|array',
            'products.*.id' => 'required|integer|exists:products,id', // Validate product id
            'products.*.description' => 'required|string', // Validate product description
            'products.*.quantity' => 'required|integer', // Validate product quantity

        ]);
        //return $data;
        // Extract 'wilaya' and 'full_address' fields into $address variable
        $address_data = [
            'wilaya' => $data['wilaya'],
            'full_address' => $data['full_address']
        ];
        $address = Address::create($address_data);
        // Remove 'wilaya' and 'full_address' fields from $data variable
        $products = $data['products'];

        unset($data['products']);
        unset($data['wilaya']);
        unset($data['full_address']);

        $data['address_id'] = $address->id;
        $order = Order::create($data);
        //return $order;

        // Attach products to the order with pivot data
        foreach ($products as $productData) {
            $product = Product::find($productData['id']); // Get the product instance
            $order->products()->attach($product, [
                'quantity' => $productData['quantity'],
                'description' => $productData['description']
            ]);
        }
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
            'price_payed' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
            'payment_image' => 'nullable|string',
            'message' => 'nullable|string',
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'wilaya' => 'required|string',
            'payment_method' => ['required', new PaymentMethodValidationRule],
            'full_address' => 'required|string',
            'phone_number' => 'required|string'
        ]);

        // Check if the order has an associated address
        if ($order->address) {
            // Update the existing address
            $order->address->update([
                'wilaya' => $data['wilaya'],
                'full_address' => $data['full_address'],
            ]);
        } else {
            // Create a new address and associate it with the order
            $address = Address::create([
                'wilaya' => $data['wilaya'],
                'full_address' => $data['full_address'],
            ]);

            $order->address()->associate($address);
        }

        // Update the order data
        $order->update($data);

        return new OrderResource($order);
    }
    public function updateStatus(Request $request, Order $order)
    {
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        $data = $request->validate([
            'status' => ['required', new StatusValidationRule],
            'message' => 'nullable|string'
        ]);


        // Update the order data
        $order->update($data);

        return $order;
    }



    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json(['message' => 'Order deleted successfully']);
    }

    public function destroyUserOrder($id)
    {
        // Retrieve the authenticated user
        $user = Auth::user();

        // Retrieve the specific order associated with the user
        $order = $user->orders->find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        $order->delete();
        return response()->json(['message' => 'Order deleted successfully']);
    }


    public function getUserOrder($id)
    {
        // Retrieve the authenticated user
        $user = Auth::user();

        // Retrieve the specific order associated with the user
        $order = $user->orders->find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        // Return the order as a response
        return new OrderResource($order);
    }

    public function getUserOrders()
    {
        $user = Auth::user(); // Get the currently authenticated user
        $orders = $user->orders; // Fetch orders associated with the user

        return OrderResource::collection($orders);
    }
}
