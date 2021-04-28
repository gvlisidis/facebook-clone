<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePostRequest;
use App\Http\Resources\PostCollection;
use App\Http\Resources\PostResource;
use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        return new PostCollection(request()->user()->posts);
    }

    public function store(CreatePostRequest $request)
    {
        $data = $request->all();

        $post = $request->user()->posts()->create($data['data']['attributes']);
        return new PostResource($post);
    }
}
