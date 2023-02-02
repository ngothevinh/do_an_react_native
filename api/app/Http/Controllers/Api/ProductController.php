<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Traits\StorageImageTrait;

class ProductController extends Controller
{
    use StorageImageTrait;
    public function index()
    {
        $product = Product::latest()->with(['images'])->get();
        return response()->json([
            'product' => $product,
            'code' => 200,
            'message' => 'success'
        ]);
    }

    public function store(Request $request)
    {
        try{
            DB::beginTransaction();
            $dataProductCreate = [
                'name' => $request->name,
                'price' => $request->price,
                'description' => $request->description,
                'isOff' => $request->isOff,
                'isAvailable' => $request->isAvailable,
                'offPercentage' => $request->offPercentage,
                'category' => $request->category,
                'status' => $request->status,
                'manufactuner' => $request->manufactuner,
            ];
            $dataUploadFeatureImage=$this->storageTraitUpload($request,'image','product_image');
            if(!empty($dataUploadFeatureImage)){
                $dataProductCreate['image_name']=$dataUploadFeatureImage['file_name'];
                $dataProductCreate['image']=$dataUploadFeatureImage['file_path'];
            }
            $product = Product::create($dataProductCreate);

            #Insert data to product_images
            if($request->hasFile('image_path')){
                foreach ($request->image_path as $fileItem){
                    $dataProductImageDetail=$this->storageTraitUploadMultiple($fileItem,'product_image');
                    $product->images()->create([
                        'product_id'=>$product->id,
                        'image_path'=>$dataProductImageDetail['file_path'],
                    ]);
                }
            }
            DB::commit();
            return response()->json([
                'product' => $product,
                'code' => 200,
                'message' => 'Thêm sản phẩm thành công'
            ]);

        }catch(\Exception $exception){
            DB::rollBack();
            Log::error('message' . $exception->getMessage(). '  line' .$exception->getLine());
            return response()->json([
                'code' => 500,
                'message' => 'Thêm sản phẩm thất bại',
            ]);
        }
    }


    public function update(Request $request,$id)
    {
        try{
            DB::beginTransaction();
            $dataProductCreate = [
                'name' => $request->name,
                'price' => $request->price,
                'description' => $request->description,
                'isOff' => $request->isOff,
                'isAvailable' => $request->isAvailable,
                'offPercentage' => $request->offPercentage,
            ];
            $dataUploadFeatureImage=$this->storageTraitUpload($request,'image','product_image');
            if(!empty($dataUploadFeatureImage)){
                $dataProductCreate['image_name']=$dataUploadFeatureImage['file_name'];
                $dataProductCreate['image']=$dataUploadFeatureImage['file_path'];
            }
            $product = Product::create($dataProductCreate);

            #Insert data to product_images
            if($request->hasFile('image_path')){
                ProductImage::where('product_id',$id)->delete();
                foreach ($request->image_path as $fileItem){
                    $dataProductImageDetail=$this->storageTraitUploadMultiple($fileItem,'product_image');
                    $product->images()->create([
                        'product_id'=>$product->id,
                        'image_path'=>$dataProductImageDetail['file_path'],
                    ]);
                }
            }
            DB::commit();
            return response()->json([
                'product' => $product,
                'code' => 200,
                'message' => 'Cập nhật sản phẩm thành công'
            ]);

        }catch(\Exception $exception){
            DB::rollBack();
            Log::error('message' . $exception->getMessage(). '  line' .$exception->getLine());
            return response()->json([
                'code' => 500,
                'message' => 'Cập nhật sản phẩm thất bại'
            ]);
        }
    }

    public function delete($id)
    {
        try{
            Product::find($id)->delete();
            return response()->json([
                'code' => 200,
                'message' => 'Xóa sản phẩm thành công'
            ]);
        }catch(\Exception $exception){
            return response()->json([
                'code' => 500,
                'message' => 'Xóa sản phẩm thất bại'
            ]);
        }
    }
    public function search($name){
        return Product::where('name','like','%' . $name . '%')->get();
    }
}
