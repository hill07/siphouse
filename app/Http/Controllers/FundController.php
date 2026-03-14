<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class FundController extends Controller
{
    public function index()
    {
        return view('home');
    }

    public function search(Request $request)
    {
        $query = $request->input('q');
        
        if (empty($query) || strlen($query) < 2) {
            return response()->json([]);
        }

        try {
            $response = Http::get("https://api.mfapi.in/mf/search?q=" . urlencode($query));
            
            if ($response->successful()) {
                return response()->json($response->json());
            }
        } catch (\Exception $e) {
            // Handle soft errors without breaking frontend
        }

        return response()->json([]);
    }

    public function show($scheme_code)
    {
        $fundData = Cache::remember("fund_{$scheme_code}", 3600, function () use ($scheme_code) {
            $response = Http::get("https://api.mfapi.in/mf/{$scheme_code}");
            
            if ($response->successful()) {
                return $response->json();
            }
            
            return null;
        });

        if (!$fundData || !isset($fundData['meta'])) {
            return redirect()->route('home')->with('error', 'Fund details not found or API is currently unavailable.');
        }

        return view('fund', compact('fundData'));
    }
}
