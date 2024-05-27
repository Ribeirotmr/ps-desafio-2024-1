<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

class Product extends Model
{
    use HasFactory, HasUuids;


    
    protected $fillable = [
        'name',
        'amount',
        'price',
        'image',
        'category_id',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    protected static function booted()
    {
        self::deleting(function (Product $product)
        {
            try
            {
                $image_name = explode('ploducts/', $product['image']);
                Storage::disk('public')->delete('products/' . $image_name[1]);
            }
            catch (Throwable)
            {
            }
        });
    }












    
}

