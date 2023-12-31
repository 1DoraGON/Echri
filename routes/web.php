<?php

use App\Http\Controllers\api\CategoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SocialAuthController;
use App\Http\Controllers\WebhookController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('/webhooks/chargily-pay', [WebhookController::class, 'handleWebhook']);
Route::get('/categories/indexWithProducts', [CategoryController::class, 'indexWithProducts']);


Route::get('/auth/google', [SocialAuthController::class, 'redirectToGoogle']);
//Route::get('/auth/google/callback', [SocialAuthController::class, 'handleGoogleCallback']);
