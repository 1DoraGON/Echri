<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;
    protected $fillable = ['wilaya','full_address'];

    public function user()
    {
        return $this->belongsTo(Order::class); // Assuming your foreign key column in users table is 'address_id'
    }
}
