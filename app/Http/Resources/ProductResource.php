<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'category_id' => $this->category_id,
            'description' => $this->description,
            'price' => $this->price,
            'color_start' => $this->color_start,
            'color_end' => $this->color_end,
            'stock' => $this->stock,
            'tags' => $this->tags,
            'main_image' => $this->main_image,
            'created_at' => Carbon::parse($this->created_at)->format('d F Y'), // Format to '14 July 2022'
            'category' => $this->category->name,
            'images' => $this->images->pluck('image_url'), // Assuming 'image_url' is the field for image URLs
        ];
    }
}

