<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Imovel extends Model
{
    use HasFactory;
    protected $table = 'imoveis';
    protected $fillable = [
        'title',
        'description',
        'imagem',
        'purchase_price',
        'sale_price',
        'profit_percentage',
        'in_stock',
        'user_id',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}