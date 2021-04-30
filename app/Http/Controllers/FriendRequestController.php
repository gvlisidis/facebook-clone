<?php

namespace App\Http\Controllers;

use App\Exceptions\UserNotFoundException;
use App\Http\Requests\SendFriendRequest;
use App\Http\Resources\FriendResource;
use App\Models\Friend;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class FriendRequestController extends Controller
{
    public function store(SendFriendRequest $request): FriendResource
    {
        $friendId = $request->input('friend_id');
        try {
            User::findOrFail($friendId)
                ->friends()->attach(auth()->user());
        } catch (ModelNotFoundException $exception) {
            throw new UserNotFoundException();
        }

        return new FriendResource(
            Friend::where('user_id', auth()->id())
            ->where('friend_id', $friendId)
            ->first()
        );
    }
}
