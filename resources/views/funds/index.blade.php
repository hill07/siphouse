@extends('layouts.app')

@section('content')
<div class="max-w-3xl mx-auto text-center mt-10">
    <h1 class="text-4xl font-extrabold text-gray-800 mb-6 drop-shadow-sm">Find Mutual Fund NAVs</h1>
    <p class="text-gray-500 mb-8 text-lg">Search through thousands of schemes to check latest and historical NAVs.</p>
    <div class="relative">
        <input type="text" id="searchInput" class="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-sm text-lg transition-all" placeholder="Search by scheme name or code..." autocomplete="off">
        <div id="searchResults" class="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 hidden overflow-hidden"></div>
    </div>
</div>

@push('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        let timeout = null;

        searchInput.addEventListener('input', function(e) {
            clearTimeout(timeout);
            const query = e.target.value;

            if (query.length < 2) {
                searchResults.innerHTML = '';
                searchResults.classList.add('hidden');
                return;
            }

            timeout = setTimeout(() => {
                fetch(`/search?q=${encodeURIComponent(query)}`)
                    .then(response => response.json())
                    .then(data => {
                        searchResults.innerHTML = '';
                        if (data.length > 0) {
                            const ul = document.createElement('ul');
                            ul.className = 'max-h-[400px] overflow-y-auto text-left';
                            data.forEach(fund => {
                                const li = document.createElement('li');
                                li.className = 'border-b last:border-b-0 hover:bg-blue-50 transition-colors';
                                li.innerHTML = `<a href="${fund.url}" class="block px-5 py-4">
                                    <div class="font-semibold text-gray-800 text-lg">${fund.scheme_name}</div>
                                    <div class="text-sm text-gray-500 mt-1"><span class="font-medium text-blue-600">${fund.fund_house}</span> &bull; Code: ${fund.scheme_code}</div>
                                </a>`;
                                ul.appendChild(li);
                            });
                            searchResults.appendChild(ul);
                            searchResults.classList.remove('hidden');
                        } else {
                            searchResults.innerHTML = '<div class="p-5 text-gray-500 text-center font-medium">No results found.</div>';
                            searchResults.classList.remove('hidden');
                        }
                    });
            }, 300);
        });

        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.add('hidden');
            }
        });
    });
</script>
@endpush
@endsection
