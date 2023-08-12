<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return CategoryResource::collection($categories);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
        ]);
        //return response(compact('data'));

        $category = Category::create($data);
        $resource = new CategoryResource($category);
        $message = 'Category have been added successfully';
        return response(compact('resource','message'));
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
        return response(compact('resource','message'));
    }

    public function destroy(Category $Category)
    {
        $Category->delete();
        return response()->json(['message' => 'Category deleted successfully']);
    }
}
