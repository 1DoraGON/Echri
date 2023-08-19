<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return CategoryResource::collection($categories);
    }
    // CategoryController.php
    
    public function indexWithProducts()
    {
        $categories = Category::withLastFiveProducts()->get();

        return response()->json(compact('categories'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', Rule::unique('categories')],
            'image_url' => 'required|image|mimes:jpeg,png,jpg,gif',
        ]);
        //return response(compact('data'));
        $imagePath = $data['image_url']->store('categories_images', 'public');
        $data['image_url'] = $imagePath;
        $category = Category::create($data);
        $resource = new CategoryResource($category);
        $message = 'Category have been added successfully';
        return response(compact('resource', 'message'));
    }

    public function show(Category $category)
    {
        return new CategoryResource($category);
    }

    public function update(Request $request, Category $category)
    {
        $data = $request->validate([
            'name' => 'required|string',
        ]);

        $category->update($data);
        $resource = new CategoryResource($category);
        $message = 'Category have been updated successfully';
        return response(compact('resource', 'message'));
    }

    public function destroy(Category $Category)
    {
        $Category->delete();
        return response()->json(['message' => 'Category deleted successfully']);
    }
}
