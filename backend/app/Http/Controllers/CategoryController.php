<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class CategoryController extends Controller
{

    private Category $category;

    public function __construct(Category $category)
    {
        $this->category = $category;

    }
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        
        $category = $this->category->all();
        return response()->json($category, Response::HTTP_OK);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $categoria = $request->validated();
        $category = $this->category->create($categoria);
        return response()->json($category, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $category = $this->category->findOrFail($id);
        return response()->json($category, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, string $id) : JsonResponse
    {
        $categoria = $request->validated();
        $category = $this->category->findOrFail($id);
        $category->update($categoria);
        return response()->json($category, Response::HTTP_OK);


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        
        $category = $this->category->findOrFail($id);
        $category->delete();
        return response()->json([], Response::HTTP_NO_CONTENT);

    }
}

