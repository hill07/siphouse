<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class MFapiService
{
    protected string $baseUrl;

    public function __construct()
    {
        $this->baseUrl = config('services.mfapi.base_url', env('MFAPI_BASE_URL', 'https://api.mfapi.in'));
    }

    /**
     * Search for Mutual Fund schemes.
     */
    public function search(string $query)
    {
        $cacheKey = "mf_search_" . md5($query);

        return Cache::remember($cacheKey, 3600, function () use ($query) {
            try {
                $response = Http::get("{$this->baseUrl}/mf/search", ['q' => $query]);
                
                if ($response->successful()) {
                    return $response->json();
                }
            } catch (\Exception $e) {
                Log::error("MFapi search error: " . $e->getMessage());
            }

            return [];
        });
    }

    /**
     * Get details of a specific scheme.
     */
    public function getScheme(string $code)
    {
        $cacheKey = "mf_scheme_{$code}";

        return Cache::remember($cacheKey, 3600, function () use ($code) {
            try {
                $response = Http::get("{$this->baseUrl}/mf/{$code}");
                
                if ($response->successful()) {
                    return $response->json();
                }
            } catch (\Exception $e) {
                Log::error("MFapi getScheme error: " . $e->getMessage());
            }

            return null;
        });
    }

    /**
     * Get latest NAV for a scheme.
     */
    public function getLatestNav(string $code)
    {
        $data = $this->getScheme($code);
        
        if ($data && isset($data['data']) && count($data['data']) > 0) {
            return $data['data'][0];
        }

        return null;
    }

    /**
     * Get NAV history for a scheme.
     */
    public function getNavHistory(string $code)
    {
        $data = $this->getScheme($code);
        
        if ($data && isset($data['data'])) {
            return $data['data'];
        }

        return [];
    }
}
