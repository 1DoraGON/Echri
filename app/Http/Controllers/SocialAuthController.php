<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Socialite;

class SocialAuthController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        $user = Socialite::driver('google')->user();

        // Use $user to handle the authenticated user details.
        // For example, you can log in the user or create a new account if it doesn't exist.

        return redirect('/'); // Redirect the user to the home page after successful sign-in.
    }
}

