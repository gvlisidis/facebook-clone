<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Friend extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $dates = ['confirmed_at'];

    public static function friendship($userId)
    {
        return (new static())
            ->where(function ($query) use ($userId){
                return $query->where('user_id', auth()->id())
                    ->where('friend_id', $userId);
            })
            ->orWhere(function ($query) use ($userId){
                return $query->where('friend_id', auth()->id())
                    ->where('user_id', $userId);
            })
            ->first();
    }
}
