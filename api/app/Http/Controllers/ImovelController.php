<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Imovel;

class ImovelController extends Controller
{


    public function create(Request $request) {

        $user = Auth::user();

        return response()->json(['data' => $request->all()], 200);
        $imagem = $request->file('imagem');
        
        if ($imagem) {
            $imagem_urn = $imagem->store('imagens', 'public');
        
            // Restante do código...
        } else {
            return response()->json([
                'status' => false,
                'msg' => 'Nenhum arquivo de imagem enviado.',
            ], 400);
        }


        try {
            Imovel::create([
                'title' => $request->title,
                'description' => $request->description,
                'purchase_price' => $request->purchase_price,
                'sale_price' => $request->sale_price,
                'profit_percentage' => $request->profit_percentage,
                'in_stock' => 1,
                'imagem' => $imagem_urn,
                'user_id' => $user->id, 
            ]);

            return response()->json([ 'msg' => 'Imovel cadastrado com sucesso !' ], 200);

        } catch(\Exception $e) {
            return response()->json([
                'status' => false,
                'msg' => $e->getMessage()
            ], 500);
        }
    }

    public function show() {
        return response()->json([ 'msg' => 'aqui e arota get !' ], 200);
    }
}
