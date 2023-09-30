<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserResource::collection(User::query()->orderBy('id', 'desc')->paginate(50));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = bcrypt($data['password']);
        $user = User::create($data);
        return response(new UserResource($user), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
        $user->update($data);
        return new UserResource($user);
    }
    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => [
                'required',
                'current_password', // Using the custom validation rule
            ],
            'new_password' => [
                'required',
                'string',
                'min:8', // Adjust the minimum password length as needed
                'confirmed', // This rule requires a password_confirmation field in the request
            ],
        ]);

        // Update the user's password
        auth()->user()->update([
            'password' => Hash::make($request->input('new_password')),
        ]);

        return response()->json(['message' => 'Password updated successfully']);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function changeImage(Request $request)
    {
        $data = $request->validate([
            'picture' => 'required|image|mimes:jpeg,png,jpg,gif',
        ]);
        $imagePath = $data['picture'];
        $imagePath = $imagePath->store('user_images', 'public');
        $data['picture'] = $imagePath;
        $user = Auth::user();
        try {
            if (!empty($user->picture) && Storage::disk('public')->exists($user->picture)) {
                Storage::disk('public')->delete($user->picture);
            }
        } catch (\Throwable $th) {
            throw $th;
        }
        $user->picture = $imagePath;
        $user->save();
        return new UserResource($user);
    }
    public function destroy(User $user)
    {
        $user->delete();
        return response('', 204);
    }
}
