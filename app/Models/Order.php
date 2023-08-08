<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function products()
    {
        return $this->belongsToMany(Product::class)->withPivot('quantity'); // Define the pivot table and pivot column
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class)->withPivot('quantity'); // Define the pivot table and pivot column
    }
}
