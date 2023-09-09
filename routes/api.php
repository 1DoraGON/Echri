<?php


use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->group(function(){

    Route::post('/logout',[AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/user/orders', [OrderController::class, 'getUserOrders']);
    Route::delete('/user/orders/{id}', [OrderController::class, 'destroyUserOrder']);
    Route::put('/admin/orders/{order}', [OrderController::class, 'updateStatus']);
    Route::apiResource('/users',UserController::class);
    Route::apiResource('/products',ProductController::class);
    Route::apiResource('/orders',OrderController::class);
    Route::get('categories/indexWithProducts', [CategoryController::class, 'indexWithProducts']);
    Route::apiResource('/categories',CategoryController::class);


});
Route::post('/test', function (Request $request) {
    $email = $request->input('email');
    $password = $request->input('password');

    // Check if email is 'test@test' and password is 'password'
    if ($email === 'test' && $password === 'test') {
        return response()->json(['message' => 'ok'], 200);
    } else {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
});


Route::post('/signup',[AuthController::class, 'signup']);
Route::post('/login',[AuthController::class, 'login']);
Route::post('/socialauth',[AuthController::class, 'socialAuth']);