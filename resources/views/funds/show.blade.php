@extends('layouts.app')

@section('title', "SIPHouse - {$fund->scheme_name} NAV History")
@section('meta_description', "Latest NAV and historical data for {$fund->scheme_name}")

@section('content')
<div class="mb-6">
    <a href="{{ route('home') }}" class="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center transition-colors">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to Search
    </a>
</div>

<div class="bg-white shadow-xl rounded-2xl overflow-hidden mb-10 border border-gray-100">
    <div class="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
        <h2 class="text-3xl font-bold text-gray-900 drop-shadow-sm">{{ $fund->scheme_name }}</h2>
        <div class="mt-4 flex flex-wrap gap-6 text-sm text-gray-700">
            <div class="bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100"><span class="font-semibold text-gray-500">Fund House:</span> <span class="text-blue-700 font-medium">{{ $fund->fundHouse ? $fund->fundHouse->name : 'N/A' }}</span></div>
            <div class="bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100"><span class="font-semibold text-gray-500">Category:</span> {{ $fund->scheme_category ?: 'N/A' }}</div>
            <div class="bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100"><span class="font-semibold text-gray-500">Type:</span> {{ $fund->scheme_type ?: 'N/A' }}</div>
            <div class="bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100"><span class="font-semibold text-gray-500">Code:</span> {{ $fund->scheme_code }}</div>
        </div>
    </div>
    <div class="px-8 py-6 bg-white">
        @php
            $latestNav = $navHistories->first();
        @endphp
        <div class="flex items-center">
            <span class="text-xl font-medium text-gray-600">Latest NAV</span> 
            @if($latestNav)
                <span class="text-4xl font-extrabold text-emerald-600 ml-4 drop-shadow-sm">₹{{ number_format((float)$latestNav->nav_value, 4) }}</span>
                <span class="text-sm rounded-full bg-gray-100 text-gray-600 px-3 py-1 ml-4 font-medium flex items-center">
                    <svg class="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    {{ \Carbon\Carbon::parse($latestNav->nav_date)->format('d M Y') }}
                </span>
            @else
                <span class="text-gray-500 ml-4 border border-gray-200 px-4 py-2 rounded-lg bg-gray-50">No NAV data available yet.</span>
            @endif
        </div>
    </div>
</div>

<div class="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
    <div class="px-8 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 class="text-xl font-bold text-gray-800">NAV History</h3>
        <span class="text-sm text-gray-500 bg-white px-3 py-1 rounded border border-gray-200 shadow-sm">Showing top 100 per page</span>
    </div>
    @if($navHistories->count() > 0)
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" class="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">NAV (₹)</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100">
                    @foreach($navHistories as $history)
                    <tr class="hover:bg-blue-50 transition-colors">
                        <td class="px-8 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">{{ \Carbon\Carbon::parse($history->nav_date)->format('d M Y') }}</td>
                        <td class="px-8 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{{ number_format((float)$history->nav_value, 4) }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        <div class="px-8 py-5 border-t border-gray-100 bg-gray-50">
            {{ $navHistories->links() }}
        </div>
    @else
        <div class="px-6 py-12 text-center">
            <svg class="mx-auto h-12 w-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path></svg>
            <span class="text-gray-500 font-medium text-lg">No history data available.</span>
        </div>
    @endif
</div>
@endsection
