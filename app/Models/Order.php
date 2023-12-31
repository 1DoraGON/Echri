<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    protected $with = ['products','address'];
    use HasFactory;
    protected $fillable = [
        'address_id',
        'user_id',
        'total_price',
        'status',
        'home_delivery',
        'price_payed',
        'payment_method',
        'description',
        'message',
        'firstname',
        'phone_number',
        'lastname',
    ];

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
        return $this->belongsTo(Address::class);
    }
}
