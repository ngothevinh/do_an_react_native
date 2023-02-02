<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


//login
Route::post('/login',[
    'as' => 'login.login',
    'uses' => 'AuthController@login'
]);

//register
Route::post('/register',[
    'as' => 'register.register',
    'uses' => 'AuthController@register'
]);
Route::prefix('products')->group(function (){

    //List product
    Route::get('/', [
        'as'=>'products.index',
        'uses'=>'ProductController@index',
    ]);

    //Add product
    Route::post('/store', [
        'as'=>'product.store',
        'uses'=>'ProductController@store'
    ]);

    //Update product
    Route::post('/update/{id}', [
        'as'=>'product.update',
        'uses'=>'ProductController@update'
    ]);

    //Delete product
    Route::get('/delete/{id}', [
        'as'=>'product.delete',
        'uses'=>'ProductController@delete',
    ]);

    //Search
    Route::get('/search/{name}', [
        'as'=>'products.search',
        'uses'=>'ProductController@search',
    ]);

});
