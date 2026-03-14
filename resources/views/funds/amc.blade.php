@extends('layouts.app')

@section('title', "SIPHouse - {$amc->name} Mutual Funds")
@section('meta_description', "Explore and check the latest NAV for all mutual fund schemes under {$amc->name}.")

@section('content')
<div class="mb-6">
    <a href="{{ route('home') }}" class="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center transition-colors">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Back to Search
    </a>
</div>

<div class="bg-white shadow-xl rounded-2xl overflow-hidden mb-10 border border-gray-100">
    <div class="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
        <h2 class="text-3xl font-bold text-gray-900 drop-shadow-sm">{{ $amc->name }}</h2>
        <div class="mt-4 flex flex-wrap gap-6 text-sm text-gray-700">
            <div class="bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100"><span class="font-semibold text-gray-500">Total Schemes:</span> <span class="text-blue-700 font-medium">{{ $schemes->total() }}</span></div>
            <div class="bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100"><span class="font-semibold text-gray-500">Last Updated:</span> {{ $amc->updated_at->format('d M Y') }}</div>
        </div>
    </div>
</div>

<div class="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
    <div class="px-8 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 class="text-xl font-bold text-gray-800">Available Schemes</h3>
    </div>
    @if($schemes->count() > 0)
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Scheme Name</th>
                        <th scope="col" class="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                        <th scope="col" class="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                        <th scope="col" class="px-8 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100">
                    @foreach($schemes as $scheme)
                    <tr class="hover:bg-blue-50 transition-colors">
                        <td class="px-8 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{{ $scheme->scheme_name }}</td>
                        <td class="px-8 py-4 whitespace-nowrap text-sm text-gray-700">{{ $scheme->scheme_category ?? 'N/A' }}</td>
                        <td class="px-8 py-4 whitespace-nowrap text-sm text-gray-700">{{ $scheme->scheme_type ?? 'N/A' }}</td>
                        <td class="px-8 py-4 whitespace-nowrap text-sm text-center">
                            <a href="{{ route('fund.show', ['scheme_code' => $scheme->scheme_code, 'slug' => $scheme->slug ?? \Illuminate\Support\Str::slug($scheme->scheme_name)]) }}" class="text-blue-600 hover:text-blue-900 font-medium inline-flex items-center">
                                View Details 
                            </a>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        <div class="px-8 py-5 border-t border-gray-100 bg-gray-50">
            {{ $schemes->links() }}
        </div>
    @else
        <div class="px-6 py-12 text-center">
            <span class="text-gray-500 font-medium text-lg">No schemes available for this AMC.</span>
        </div>
    @endif
</div>
@endsection
