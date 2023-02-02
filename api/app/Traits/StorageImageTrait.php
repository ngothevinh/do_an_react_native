<?php
namespace App\Traits;
use  Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

trait StorageImageTrait{
    #Lấy file name,lưu đường dẫn khi upload
    public function storageTraitUpload(Request $request, $fieldName ,$folderName){
        if($request->hasFile($fieldName)){
            $file=$request->$fieldName;
            $fileNameOrigin=$file->getClientOriginalName();
            $fileNameHash=str_random(20) . '.' .$file->getClientOriginalExtension();
            $filePath = $request->file($fieldName)->storeAs('public/'.$folderName. '/'. auth()->id(),$fileNameHash);
            $dataUploadTrait=[
                'file_name'=>$fileNameOrigin,
                'file_path'=>Storage::url($filePath)
            ];
            return $dataUploadTrait;
        }
        return null;
    }
    #Upload nhiều hình ảnh
    public function storageTraitUploadMultiple($file,$folderName){
        $fileNameOrigin=$file->getClientOriginalName();
        $fileNameHash=str_random(20) . '.' .$file->getClientOriginalExtension();
        $filePath = $file->storeAs('public/'.$folderName. '/'. auth()->id(),$fileNameHash);
        $dataUploadTrait=[
            'file_name'=>$fileNameOrigin,
            'file_path'=>Storage::url($filePath)
        ];
        return $dataUploadTrait;
    }

}

