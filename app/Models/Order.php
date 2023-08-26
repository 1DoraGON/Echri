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
        return $this->belongsToMany(Product::class)->withPivot('quantity', 'description'); // Define the pivot table and pivot column
    }

    public function address()
    {
        return $this->hasOne(Address::class); // Assuming your foreign key column in users table is 'address_id'
    }
}
