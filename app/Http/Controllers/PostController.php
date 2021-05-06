<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePostRequest;
use App\Http\Resources\PostCollection;
use App\Http\Resources\PostResource;
use App\Models\Friend;
use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        $friends = Friend::friendships();

        if ($friends->isEmpty()){
            return new PostCollection(request()->user()->posts);
        }

        return new PostCollection(
            Post::whereIn('user_id', [$friends->pluck('user_id'), $friends->pluck('friend_id')])->get()
        );

    }

    public function store(CreatePostRequest $request)
    {
        $data = $request->all();

        $post = $request->user()->posts()->create($data['data']['attributes']);
        return new PostResource($post);
    }
}
