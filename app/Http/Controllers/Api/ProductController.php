<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use App\Models\ProductImage;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return ProductResource::collection($products);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
            'color_start' => 'nullable|string',
            'color_end' => 'nullable|string',
            'stock' => 'nullable|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif'
        ]);
        //return response(compact('data'));

        $imagePath = $data['image'];
        unset($data['image']);
        $product = Product::create($data);
        $imagePath = $imagePath->store('product_images', 'public');
        $image = ProductImage::create([
            'image_url' => $imagePath,
            'product_id' => $product->id
        ]);
        return new ProductResource($product);
    }

    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
            'color_start' => 'nullable|string',
            'color_end' => 'nullable|string',
            'stock' => 'nullable|integer',
        ]);

        $product->update($data);
        return new ProductResource($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }
}
