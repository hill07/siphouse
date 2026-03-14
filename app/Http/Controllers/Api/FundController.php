<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\MFapiService;
use Illuminate\Http\Request;

class FundController extends Controller
{
    protected MFapiService $mfApiService;

    public function __construct(MFapiService $mfApiService)
    {
        $this->mfApiService = $mfApiService;
    }

    public function search(Request $request)
    {
        $query = $request->query('q');

        if (!$query || strlen($query) < 2) {
            return response()->json([]);
        }

        $results = $this->mfApiService->search($query);

        return response()->json($results);
    }

    public function show($code)
    {
        $scheme = $this->mfApiService->getScheme($code);

        if (!$scheme) {
            return response()->json(['error' => 'Scheme not found'], 404);
        }

        return response()->json($scheme);
    }

    public function latest($code)
    {
        $latest = $this->mfApiService->getLatestNav($code);

        if (!$latest) {
            return response()->json(['error' => 'Latest NAV not found'], 404);
        }

        return response()->json($latest);
    }

    public function history($code)
    {
        $history = $this->mfApiService->getNavHistory($code);

        return response()->json($history);
    }
}
