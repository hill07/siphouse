<template>
  <div class="relative w-full max-w-2xl mx-auto" ref="dropdownRef">
    <div class="relative group">
      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search class="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
      </div>
      <input
        type="text"
        v-model="query"
        @focus="onFocus"
        placeholder="Search for Mutual Fund schemes..."
        class="block w-full pl-11 pr-12 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 placeholder-gray-400 text-lg"
      />
      <div class="absolute inset-y-0 right-0 pr-4 flex items-center">
        <Loader2 v-if="loading" class="h-5 w-5 text-indigo-500 animate-spin" />
        <button v-else-if="query" @click="query = ''">
          <X class="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </button>
      </div>
    </div>

    <!-- Dropdown Results -->
    <div v-if="showDropdown && results.length > 0" class="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden">
      <ul class="divide-y divide-gray-50">
        <li 
          v-for="scheme in results" 
          :key="scheme.schemeCode"
          @click="handleSelect(scheme)"
          class="px-4 py-3 hover:bg-indigo-50 cursor-pointer transition-colors group"
        >
          <div class="flex justify-between items-center">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate group-hover:text-indigo-700">
                {{ scheme.schemeName }}
              </p>
              <p class="text-xs text-gray-500">
                Code: {{ scheme.schemeCode }}
              </p>
            </div>
            <span class="ml-4 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
              View detail
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { Search, X, Loader2 } from 'lucide-vue-next';
import axios from 'axios';

const query = ref('');
const results = ref([]);
const loading = ref(false);
const showDropdown = ref(false);
const dropdownRef = ref(null);
const router = useRouter();

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showDropdown.value = false;
  }
};

onMounted(() => document.addEventListener('mousedown', handleClickOutside));
onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside));

let debounceTimeout = null;

watch(query, (newQuery) => {
  if (newQuery.length < 3) {
    results.value = [];
    showDropdown.value = false;
    return;
  }

  if (debounceTimeout) clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(async () => {
    loading.value = true;
    try {
      const response = await axios.get(`/api/search?q=${newQuery}`);
      results.value = Array.isArray(response.data) ? response.data.slice(0, 10) : [];
      showDropdown.value = results.value.length > 0;
    } catch (err) {
      // Error handled via loading state or silent failure in production
    } finally {
      loading.value = false;
    }
  }, 500);
});

const onFocus = () => {
  if (query.value.length >= 3 && results.value.length > 0) {
    showDropdown.value = true;
  }
};

const handleSelect = (scheme) => {
  query.value = '';
  showDropdown.value = false;
  router.push(`/scheme/${scheme.schemeCode}`);
};
</script>
