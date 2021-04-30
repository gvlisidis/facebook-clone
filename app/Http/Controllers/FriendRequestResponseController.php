<?php

namespace App\Http\Controllers;

use App\Exceptions\FriendRequestNotFoundException;
use App\Http\Requests\FriendResponseRequest;
use App\Http\Requests\IgnoreFriendRequest;
use App\Http\Resources\FriendResource;
use App\Models\Friend;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class FriendRequestResponseController extends Controller
{
    public function store(FriendResponseRequest $request): FriendResource
    {
        try {
            $friendRequest = Friend::where('user_id', $request->input('user_id'))
                ->where('friend_id', auth()->id())
                ->firstOrFail();
        } catch (ModelNotFoundException $exception) {
            throw new FriendRequestNotFoundException();
        }

        $friendRequest->update(array_merge($request->all(), [
            'confirmed_at' => now(),
        ]));

        return new FriendResource($friendRequest);
    }

    public function destroy(IgnoreFriendRequest $request)
    {
        try {
            Friend::where('user_id', $request->input('user_id'))
                ->where('friend_id', auth()->id())
                ->firstOrFail()
                ->delete();
        } catch (ModelNotFoundException $exception) {
            throw new FriendRequestNotFoundException();
        }

        return response()->json([], 204);
    }
}
