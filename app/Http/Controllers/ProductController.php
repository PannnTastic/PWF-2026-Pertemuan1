<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('user', 'category')->get();
        return view('product.index', compact('products'));
    }

    public function create()
    {
        Gate::authorize('manage-product');
        $categories = Category::all();
        return view('product.create', compact('categories'));
    }

    public function store(StoreProductRequest $request)
    {
        Gate::authorize('manage-product');
        $data = $request->validated();
        $data['user_id'] = Auth::id();
        Product::create($data);

        return redirect()->route('product.index')->with('success', 'Product created successfully.');
    }

    public function show(Product $product)
    {
        return view('product.show', compact('product'));
    }

    public function edit(Product $product)
    {
        Gate::authorize('manage-product');
        $categories = Category::all();
        return view('product.edit', compact('product', 'categories'));
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        \Illuminate\Support\Facades\Gate::authorize('update', $product);
        $product->update($request->validated());

        return redirect()->route('product.index')->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        \Illuminate\Support\Facades\Gate::authorize('delete', $product);
        $product->delete();

        return redirect()->route('product.index')->with('success', 'Product deleted successfully.');
    }
}
