@extends('layouts.app')

@section('title', "SIPHouse - {$fundData['meta']['scheme_name']} NAV")
@section('meta_description', "Latest NAV and historical NAV data for {$fundData['meta']['scheme_name']}.")

@section('content')
<div class="mb-6">
    <a href="{{ route('home') }}" class="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center transition-colors">
        <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to Search
    </a>
</div>

<div class="bg-white shadow-lg rounded-2xl overflow-hidden mb-8 border border-slate-200">
    <div class="p-6 md:p-8 border-b border-slate-100 bg-gradient-to-br from-indigo-50/50 to-white">
        <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
                <h1 class="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-2">{{ $fundData['meta']['scheme_name'] }}</h1>
                <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-slate-600">
                    <div class="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm w-max">
                        <svg class="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        <span class="font-medium text-slate-800">{{ $fundData['meta']['fund_house'] }}</span>
                    </div>
                    <span class="hidden sm:block text-slate-300">&bull;</span>
                    <span class="font-medium text-slate-700">{{ $fundData['meta']['scheme_category'] }}</span>
                    <span class="hidden sm:block text-slate-300">&bull;</span>
                    <span class="text-slate-500">Code: {{ $fundData['meta']['scheme_code'] }}</span>
                </div>
            </div>
            
            @if(count($fundData['data']) > 0)
            <div class="bg-white border-2 border-indigo-100 rounded-xl p-4 shadow-sm text-center min-w-[160px]">
                <div class="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Latest NAV</div>
                <div class="text-3xl font-extrabold text-indigo-600">₹{{ number_format((float)$fundData['data'][0]['nav'], 4) }}</div>
                <div class="text-xs text-slate-500 mt-2 font-medium bg-slate-100 rounded-full px-2 py-1 inline-block">
                    As of {{ $fundData['data'][0]['date'] }}
                </div>
            </div>
            @endif
        </div>
    </div>
</div>

<div class="bg-white shadow-lg rounded-2xl overflow-hidden border border-slate-200 relative">
    <div class="px-6 py-5 border-b border-slate-200 bg-slate-50 flex justify-between items-center sticky top-0 md:static z-10">
        <h2 class="text-lg font-bold text-slate-800 flex items-center gap-2">
            <svg class="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            Historical NAV Data
        </h2>
    </div>
    
    @if(count($fundData['data']) > 0)
        <!-- Used a scrolling container for the large table -->
        <div class="overflow-y-auto max-h-[600px] w-full">
            <table class="min-w-full divide-y divide-slate-200 text-left">
                <thead class="bg-slate-50 sticky top-0 z-10 shadow-sm">
                    <tr>
                        <th scope="col" class="px-6 sm:px-8 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                        <th scope="col" class="px-6 sm:px-8 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">NAV (₹)</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-slate-100">
                    @foreach($fundData['data'] as $history)
                    <tr class="hover:bg-indigo-50/50 transition-colors">
                        <td class="px-6 sm:px-8 py-4 whitespace-nowrap text-sm font-medium text-slate-700">
                            {{ $history['date'] }}
                        </td>
                        <td class="px-6 sm:px-8 py-4 whitespace-nowrap text-sm font-bold text-slate-900">
                            {{ number_format((float)$history['nav'], 4) }}
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    @else
        <div class="px-6 py-16 text-center">
            <svg class="mx-auto h-12 w-12 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
            <span class="text-slate-500 font-medium tracking-wide">No NAV history available from the API.</span>
        </div>
    @endif
</div>
@endsection
