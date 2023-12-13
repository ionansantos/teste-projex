<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ImovelController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [AuthController::class, 'createUser']);

Route::post('login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function(){  
    Route::post('imovel/create', [ImovelController::class, 'create']);
    Route::post('logout', [AuthController::class, 'logout']); 
    Route::get('getImovel', [ImovelController::class, 'show']);
});
