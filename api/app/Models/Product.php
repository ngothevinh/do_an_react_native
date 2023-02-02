<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = ['name', 'price','description','isOff','isAvailable','offPercentage','image','image_name','category','status','manufactuner'];

    #Tạo relationship với bảng ProductImage (one to many)
    public function images(){
        return $this->hasMany(ProductImage::class,'product_id');
    }
}
