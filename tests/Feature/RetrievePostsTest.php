<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class RetrievePostsTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_retrieve_posts()
    {
        Sanctum::actingAs($user = User::factory()->create(), ['*']);
        $posts = Post::factory()->count(2)->create(
            [
                'user_id' => $user->id,
            ]
        );

        $response = $this->get('/api/posts');

        $response->assertStatus(200)
            ->assertJson(
                [
                    'data' => [
                        [
                            'data' => [
                                'type' => 'posts',
                                'post_id' => $posts->last()->id,
                                'attributes' => [
                                    'body' => $posts->last()->body,
                                ]
                            ]
                        ],
                        [
                            'data' => [
                                'type' => 'posts',
                                'post_id' => $posts->first()->id,
                                'attributes' => [
                                    'body' => $posts->first()->body,
                                ]
                            ]
                        ],
                    ],
                    'links' => [
                        'self' => url('/posts'),
                    ]
                ]
            );
    }

    /** @test */
    public function a_user_can_only_retrieve_their_posts()
    {
        Sanctum::actingAs($user = User::factory()->create(), ['*']);
        $posts = Post::factory()->create();

        $response = $this->get('/api/posts');

        $response->assertStatus(200)
            ->assertExactJson(
                [
                    'data' => [],
                    'links' => [
                        'self' => url('/posts'),
                    ]
                ]
            );
    }
}