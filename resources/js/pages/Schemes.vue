<template>
  <div class="py-12 bg-white min-h-[80vh]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Explore Schemes</h1>
          <p class="text-gray-500 mt-1">Browse and filter thousands of mutual fund schemes.</p>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <form @submit.prevent="fetchSchemes" class="relative">
            <input 
              type="text"
              placeholder="Filter results..."
              v-model="searchTerm"
              class="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all w-64"
            />
            <Search class="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </form>

          <div class="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
            <ListFilter class="w-4 h-4 text-gray-400" />
            <select 
              v-model="limit"
              @change="offset = 0"
              class="bg-transparent text-sm font-medium text-gray-700 outline-none"
            >
              <option :value="20">20 / page</option>
              <option :value="50">50 / page</option>
              <option :value="100">100 / page</option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="loading" class="animate-pulse space-y-4">
          <div v-for="i in 5" :key="i" class="h-16 bg-gray-100 rounded-lg"></div>
      </div>

      <div v-else class="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/50">
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fund Code</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Scheme Name</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="scheme in paginatedSchemes" :key="scheme.schemeCode" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 text-sm font-mono text-gray-500">
                {{ scheme.schemeCode }}
              </td>
              <td class="px-6 py-4 text-sm font-medium text-gray-900">
                {{ scheme.schemeName }}
              </td>
              <td class="px-6 py-4 text-sm">
                <router-link 
                  :to="`/scheme/${scheme.schemeCode}`"
                  class="inline-flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                >
                  <span>Details</span>
                  <ExternalLink class="w-3 h-3" />
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Controls -->
      <div v-if="!loading && schemes.length > 0" class="mt-8 flex items-center justify-between border-t border-gray-100 pt-8">
        <p class="text-sm text-gray-500">
          Showing <span class="font-semibold text-gray-900">{{ offset + 1 }}</span> to <span class="font-semibold text-gray-900">{{ Math.min(offset + limit, schemes.length) }}</span> of <span class="font-semibold text-gray-900">{{ schemes.length }}</span> results
        </p>
        <div class="flex space-x-2">
          <button 
            @click="offset = Math.max(0, offset - limit)"
            :disabled="offset === 0"
            class="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft class="w-5 h-5" />
          </button>
          <button 
            @click="offset = offset + limit"
            :disabled="offset + limit >= schemes.length"
            class="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { Search, ChevronLeft, ChevronRight, ListFilter, ExternalLink } from 'lucide-vue-next';
import axios from 'axios';

const schemes = ref([]);
const loading = ref(true);
const limit = ref(50);
const offset = ref(0);
const searchTerm = ref('');

const fetchSchemes = async () => {
    loading.value = true;
    try {
        const response = await axios.get(`/api/search?q=${searchTerm.value || 'SBI'}`);
        schemes.value = response.data;
    } catch (err) {
        console.error(err);
    } finally {
        loading.value = false;
    }
};

onMounted(fetchSchemes);

const paginatedSchemes = computed(() => {
    return schemes.value.slice(offset.value, offset.value + limit.value);
});
</script>
