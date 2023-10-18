<?php


use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\ProxyController;
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


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/proxy-to-chargily', [ProxyController::class, 'proxyToChargily']);

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::put('/user/changeImage', [UserController::class, 'changeImage']);

    Route::get('/user/orders', [OrderController::class, 'getUserOrders']);
    Route::delete('/user/orders/{id}', [OrderController::class, 'destroyUserOrder']);
    Route::put('/user/updatePassword', [UserController::class, 'updatePassword']);
    Route::put('/admin/orders/{order}', [OrderController::class, 'updateStatus']);
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/orders', OrderController::class);
    Route::apiResource('/categories', CategoryController::class);
    Route::apiResource('/products', ProductController::class);

});

Route::get('/products', [ProductController::class, 'index']); // Products Index
Route::get('/products/{id}', [ProductController::class, 'show']); // Products Show
Route::get('/categories', [CategoryController::class, 'index']); // Products Index
//Route::get('/categories/indexWithProducts', [CategoryController::class, 'indexWithProducts']);
Route::get('/categories/{id}', [CategoryController::class, 'show']); // Products Index
// Guest Routes (accessible only to non-authenticated users)
Route::middleware('guest')->group(function () {
    Route::post('/signup', [AuthController::class, 'signup']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/socialauth', [AuthController::class, 'socialAuth']);// Public Routes (accessible to everyone, including guests)
    
});
