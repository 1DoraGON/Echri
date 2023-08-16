<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $with = ['products'];

    use HasFactory;
    protected $fillable = [
        'name',
        'image_url'
    ];
    // Category.php
    public function scopeWithLastFiveProducts($query)
    {
        return $query->with(['products' => function ($query) {
            $query->select('id', 'name', 'category_id')
                ->orderByDesc('created_at')
                ->limit(5);
        }]);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
