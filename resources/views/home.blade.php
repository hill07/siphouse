@extends('layouts.app')

@section('content')
<div class="max-w-2xl mx-auto text-center mt-12">
    <h1 class="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-4">Find Your Mutual Fund</h1>
    <p class="text-lg text-slate-500 mb-10">Instant search across all Indian mutual fund schemes.</p>
    
    <div class="relative max-w-xl mx-auto text-left">
        <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input type="text" id="searchInput" class="block w-full pl-11 pr-4 py-4 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg shadow-sm transition-all" placeholder="Enter fund name or scheme code (min 2 chars)" autocomplete="off">
            <div id="loadingIndicator" class="absolute inset-y-0 right-0 pr-4 flex items-center hidden">
                <svg class="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            </div>
        </div>
        
        <div id="searchResults" class="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 hidden overflow-hidden"></div>
    </div>
</div>

@push('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        const loadingIndicator = document.getElementById('loadingIndicator');
        let timeout = null;
        let controller = null;

        searchInput.addEventListener('input', function(e) {
            clearTimeout(timeout);
            const query = e.target.value.trim();

            if (query.length < 2) {
                searchResults.innerHTML = '';
                searchResults.classList.add('hidden');
                loadingIndicator.classList.add('hidden');
                if(controller) {
                    controller.abort();
                }
                return;
            }

            loadingIndicator.classList.remove('hidden');

            timeout = setTimeout(() => {
                if(controller) {
                    controller.abort();
                }
                controller = new AbortController();

                fetch(`/search?q=${encodeURIComponent(query)}`, { signal: controller.signal })
                    .then(response => response.json())
                    .then(data => {
                        loadingIndicator.classList.add('hidden');
                        searchResults.innerHTML = '';
                        
                        if (data && data.length > 0) {
                            const ul = document.createElement('ul');
                            ul.className = 'max-h-[350px] overflow-y-auto divide-y divide-slate-100';
                            data.forEach(fund => {
                                const li = document.createElement('li');
                                li.className = 'hover:bg-indigo-50 transition-colors duration-150';
                                li.innerHTML = `<a href="/fund/${fund.schemeCode}" class="block px-4 py-3">
                                    <div class="font-medium text-slate-800">${fund.schemeName}</div>
                                    <div class="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Code: ${fund.schemeCode}</div>
                                </a>`;
                                ul.appendChild(li);
                            });
                            searchResults.appendChild(ul);
                            searchResults.classList.remove('hidden');
                        } else {
                            searchResults.innerHTML = '<div class="px-4 py-6 text-slate-500 text-center flex flex-col items-center"><svg class="h-8 w-8 text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>No mutual funds found.</span></div>';
                            searchResults.classList.remove('hidden');
                        }
                    }).catch(error => {
                        if (error.name !== 'AbortError') {
                            loadingIndicator.classList.add('hidden');
                            searchResults.innerHTML = '<div class="px-4 py-6 text-red-500 text-center">Failed to fetch results.</div>';
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
