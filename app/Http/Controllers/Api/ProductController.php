<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use App\Models\ProductImage;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Rules\ImageOrUrl;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('index')) {
            $products = Product::latest()->get(); // Retrieve all products
            return ProductResource::collection($products);
        }
        $perPage = 20;
        
        $products = Product::latest()
            ->filter($request->only(['search', 'category']))
            ->paginate($perPage);
    
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
            'main_image' => 'required|image|mimes:jpeg,png,jpg,gif',
            'images' => 'nullable',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif'
        ]);

        $imagePath = $data['main_image'];
        $imagePath = $imagePath->store('main_product_images', 'public');
        $data['main_image'] = $imagePath;

        $images = $data['images'] ?? []; // Retrieve the images array after it's stored in the $data array
        unset($data['images']);

        //return response(compact('data'));

        $product = Product::create($data);
        foreach ($images as $key => $value) {
            $imagePath = $value->store('product_images', 'public');
            $image = ProductImage::create([
                'image_url' => $imagePath,
                'product_id' => $product->id
            ]);
        }
        //$images = $product->images;
        //return response(compact('images'));

        return new ProductResource($product);
    }

    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name' => 'string',
            'category_id' => 'integer|exists:categories,id',
            'description' => 'nullable|string',
            'price' => 'numeric|regex:/^\d+(\.\d{1,2})?$/',
            'color_start' => 'nullable|string',
            'color_end' => 'nullable|string',
            'stock' => 'nullable|integer',
            'tags' => 'nullable|string',
            'main_image' => [ new ImageOrUrl],
            'images' => 'nullable',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif',
            'old_images' => 'nullable',
            'old_images.*' => 'nullable|string'
        ]);

        //return response(compact('data'));

        if (!empty($data['main_image'])) {
        if ($product->main_image !== $data['main_image']) {
                # code...
                if (!empty($product->main_image) && Storage::disk('public')->exists($product->main_image)) {
                    Storage::disk('public')->delete($product->main_image);
                }
                $imagePath = $data['main_image']->store('main_product_images', 'public');
                $data['main_image'] = $imagePath;
                //return response(compact('data'));
                $product->save();
            }
        }
            
        $images = $data['images'] ?? [];
        $old_images = $product->images;
        $existed_images = $data['old_images'] ?? [];

        foreach ($old_images as $value) {
            if (!in_array($value->image_url, $existed_images)) {
                $value->delete();
                if (!empty($value->image_url) && Storage::disk('public')->exists($value->image_url)) {
                    Storage::disk('public')->delete($value->image_url);
                }
            }
        }
        if ($images) {
            foreach ($images as $key => $value) {

                $imagePath = $value->store('product_images', 'public');
                $image = ProductImage::create([
                    'image_url' => $imagePath,
                    'product_id' => $product->id
                ]);
            }
        }
        unset($data['images']);
        unset($data['old_images']);
        $product->update($data);

        return new ProductResource($product);
    }


    public function destroy(Product $product)
    {
        //return response()->json(['message' => 'reaching this point', 'product'=>$product]);

        if (!empty($product->main_image) && Storage::disk('public')->exists($product->main_image)) {
            Storage::disk('public')->delete($product->main_image);
        }
        if ($product->images) {
            
            foreach($product->images as $value ){
                if (!empty($value->image_url) && Storage::disk('public')->exists($value->image_url)) {
                    Storage::disk('public')->delete($value->image_url);
                }
            }
        }
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }
}
