<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminCheckMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Check if the authenticated user is an admin
        if ($request->user() && $request->user()->is_admin) {
            return $next($request);
        }

        // If not an admin, redirect or return a response (based on your requirements)
        return response()->json(['error' => 'admin kho'], 401);
    }
}