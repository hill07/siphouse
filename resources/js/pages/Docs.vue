<template>
  <div class="py-20 bg-gray-50/50 min-h-screen">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">API Documentation</h1>
        <p class="text-gray-500 text-lg">Build the next generation of fintech apps with our ready-to-use API.</p>
      </div>

      <div class="space-y-12">
        <!-- Intro -->
        <section class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Terminal class="w-5 h-5 text-indigo-600" />
            Getting Started
          </h2>
          <div class="prose prose-indigo text-gray-600">
            <p>All requests should be sent to our base API URL. Responses are returned in consistent JSON format.</p>
            <div class="mt-4 flex items-center justify-between bg-gray-900 text-indigo-300 p-4 rounded-xl font-mono text-sm group">
              <span>{{ baseUrl }}</span>
              <button @click="handleCopy(baseUrl, 'base')" class="text-gray-500 hover:text-white transition-colors">
                <Check v-if="copied === 'base'" class="w-4 h-4 text-green-400" />
                <Copy v-else class="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        <!-- Endpoints -->
        <section v-for="(ep, idx) in endpoints" :key="idx" class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm overflow-hidden">
          <div class="flex items-center gap-3 mb-6">
            <span class="bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-black tracking-widest">{{ ep.method }}</span>
            <h3 class="text-lg font-bold text-gray-900 font-mono">{{ ep.path }}</h3>
          </div>
          
          <p class="text-gray-600 mb-8">{{ ep.desc }}</p>

          <div class="space-y-6">
            <div>
              <h4 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Parameters</h4>
              <div class="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                <table class="w-full text-left text-sm">
                  <thead class="bg-gray-100/50 border-b border-gray-100">
                    <tr>
                      <th class="px-4 py-3 font-bold text-gray-600">Name</th>
                      <th class="px-4 py-3 font-bold text-gray-600">Type</th>
                      <th class="px-4 py-3 font-bold text-gray-600">Description</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100">
                    <tr v-for="(p, i) in ep.params" :key="i">
                      <td class="px-4 py-3 font-mono text-indigo-600">{{ p.name }}</td>
                      <td class="px-4 py-3 italic text-gray-400">{{ p.type }}</td>
                      <td class="px-4 py-3 text-gray-600">{{ p.desc }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Example Request</h4>
              <div class="bg-gray-50 p-4 rounded-xl flex items-center justify-between border border-gray-100 font-mono text-xs">
                <code class="text-gray-600 overflow-x-auto whitespace-nowrap">{{ ep.example }}</code>
                <button @click="handleCopy(ep.example, idx)" class="ml-4 text-gray-400 hover:text-indigo-600 transition-colors">
                  <Check v-if="copied === idx" class="w-4 h-4 text-green-400" />
                  <Copy v-else class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Rate Limiting Note -->
        <div class="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200">
          <div class="flex items-center gap-4 mb-4">
            <Info class="w-8 h-8 text-indigo-200" />
            <h2 class="text-xl font-bold">Important: Rate Limiting</h2>
          </div>
          <p class="text-indigo-100 leading-relaxed">
            Our API is throttled to <span class="font-bold text-white">60 requests per minute</span> to ensure stability. 
            If you exceed this limit, you will receive a 429 status code. Please cache responses on your end for optimal performance.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Copy, Terminal, Info, Check } from 'lucide-vue-next';

const copied = ref(null);
const baseUrl = window.location.origin + '/api';

const endpoints = [
  {
    method: 'GET',
    path: '/search?q={query}',
    desc: 'Search for mutual fund schemes with autocomplete.',
    params: [{ name: 'q', type: 'string', desc: 'Min 3 chars search query' }],
    example: `${baseUrl}/search?q=SBI`
  },
  {
    method: 'GET',
    path: '/scheme/{code}',
    desc: 'Get full scheme meta information and full NAV history.',
    params: [{ name: 'code', type: 'integer', desc: 'The unique scheme code (e.g. 102885)' }],
    example: `${baseUrl}/scheme/102885`
  },
  {
    method: 'GET',
    path: '/scheme/{code}/latest',
    desc: 'Get only the latest NAV for a specific scheme.',
    params: [{ name: 'code', type: 'integer', desc: 'Unique scheme code' }],
    example: `${baseUrl}/scheme/102885/latest`
  }
];

const handleCopy = (text, id) => {
  navigator.clipboard.writeText(text);
  copied.value = id;
  setTimeout(() => copied.value = null, 2000);
};
</script>
