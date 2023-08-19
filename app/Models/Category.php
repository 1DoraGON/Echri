<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    
    use HasFactory;
    protected $with = ['products'];
    protected $fillable = [
        'name',
        'image_url'
    ];
    
    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function scopeWithLastFiveProducts($query)
    {
        return $query->with(['products' => function ($query) {
            $query->select('id', 'name', 'category_id')
                ->orderBy('created_at', 'desc');
        }]);
    }
}
