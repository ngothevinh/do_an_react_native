<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(),[
            'name' => 'required|min:2|max:100',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:2|max:100'
        ]);
        if($validator->fails()) {
            return response()->json([
                'message' => 'Validator fails',
                'errors' => $validator->errors(),
                'code' => 500
            ]);
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
        return response()->json([
            'message' => 'Register successfully',
            'data' => $user,
            'code' => 200
        ]);
    }
    public function login(Request $request){
        $dataCheck = [
            'email' => $request->email,
            'password' => $request->password
        ];
        if(auth()->attempt($dataCheck)){
            return response()->json([
                'message' => 'login success',
                'code' => 200,
                'users' => auth()->user()
            ]);
        }
        return response()->json([
            'message' => 'login failed',
            'code' => 500
        ]);
    }
}
