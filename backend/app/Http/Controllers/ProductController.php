<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Throwable;
use Illuminate\Support\Facades\Storage;


class ProductController extends Controller
{

    private Product $product;
    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        
        $product = $this->product->with('category')->get();
        return response()->json($product, Response::HTTP_OK);

    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request): JsonResponse
    {
        
        $produto = $request->validated();

        if ($request->hasFile('image'))
        {
            $path = $request->file('image')->store('products','public');
            $produto['image'] = url('storage/' . $path);

        }

        $product = $this->product->create($produto);
        $product->load('category');
        return response()->json($product, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        
        $product = $this->product->with('category')->findOrFail($id);
        return response()->json($product,Response::HTTP_OK);
    }   

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, string $id)
    {
        
        $produto = $request->validated();
        $product = $this->product->findOrFail($id);

        if ($request->hasFile('image'))
        {
            try
            {
                $image_name = explode('product/', $product->image);
                Storage::disk('public')->delete('products/' . $image_name[1]);
            }
            catch(Throwable)
            {
            }
            finally
            {
            $path = $request->file('image')->store('products','public');
            $produto['image'] = url('storage/' . $path);
            }
        }
        $product->update($produto);
        $product->load('category');
        return response()->json($product, Response::HTTP_OK);




    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        
        $product = $this->product->findOrFail($id);
        $product->delete();
        return response()->json([], Response::HTTP_NO_CONTENT);
    }
    

    public function disable(string $id)
    {
        $product = $this->product->findOrFail($id);
        $product->update(['status' => 0]);
        return response()->json($product, Response::HTTP_OK);
    }

    
    public function decreaseAmount(string $id, int $amount)
    {
        $product = $this->product->findOrFail($id);
        $product->update(['amount' => $product->amount - $amount]);
        return response()->json($product, Response::HTTP_OK);
    }


}

