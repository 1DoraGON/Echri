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
            'category_id' => 'required|integer|exists:categories,id',
            'description' => 'nullable|string',
            'price' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
            'color_start' => 'nullable|string',
            'color_end' => 'nullable|string',
            'stock' => 'nullable|integer',
            'tags' => 'nullable|string',
            'main_image' => 'nullable|image|mimes:jpeg,png,jpg,gif',
            'images' => 'nullable',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif'
        ]);

        $imagePath = $data['main_image'];
        $imagePath = $imagePath->store('main_product_images', 'public');
        unset($data['main_image']);

        $images = $data['images']; // Retrieve the images array after it's stored in the $data array
        $category = $data['category_id'];
        unset($data['images']);
        unset($data['category_id']);
        //return response(compact('data'));
        
        $product = Product::create($data);
        $product->category_id = $category;
        $product->main_image = $imagePath;
        $product->save();
        foreach ($images as $key => $value) {
            $imagePath = $value->store('product_images', 'public');
            $image = ProductImage::create([
                'image_url' => $imagePath,
                'product_id' => $product->id
            ]);
        }
        $images = $product->images;
        return response(compact('images'));

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
