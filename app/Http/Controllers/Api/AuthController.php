<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\SocialAuthRequest;

class AuthController extends Controller
{
    //
    public function login(LoginRequest $request){
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)){
            return response([
                'errors' => ['password'=>['Provided email address or password is incorrect']]
            ],422);
        }
        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user','token'));
    }

    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'firstname' => $data['firstname'],
            'lastname' => $data['lastname'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }
    public function socialAuth(SocialAuthRequest $request)
    {
        $data = $request->validated();
    
        // Check if the email already exists in the database
        if (User::where('email', $data['email'])->exists()) {
            // If the user already exists, log them in and return the token
            $user = User::where('email', $data['email'])->first();
            $token = $user->createToken('main')->plainTextToken;
            return response(compact('user', 'token'));
        } else {
            // If the user does not exist, create a new user without a password
            $user = User::create([
                'firstname' => $data['firstname'] ?? '',
                'lastname' => $data['lastname'] ?? '',
                'email' => $data['email'],
                'password' => '', // Set password to an empty string or null
            ]);
            $user->picture = $data['picture'];
            $user->is_social_auth = 1;
            $user->save();
    
            $token = $user->createToken('main')->plainTextToken;
            return response(compact('user', 'token'));
        }
    }
    
    public function logout(Request $request){
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('',204);
    }
}
