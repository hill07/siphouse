<template>
  <div class="py-12 bg-white min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <button 
          @click="router.back()"
          class="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 mb-8 transition-colors group"
      >
          <ArrowLeft class="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span class="font-medium">Back to search</span>
      </button>

      <div v-if="loading" class="min-h-[60vh]">
          <Loader size="lg" />
          <p class="text-center text-gray-500">Fetching latest NAV data...</p>
      </div>

      <div v-else-if="error" class="min-h-[60vh] text-center">
          <p class="text-red-500 mb-4">{{ error }}</p>
          <button @click="router.back()" class="text-indigo-600 font-bold underline">Go Back</button>
      </div>

      <div v-else-if="fund" class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Left Column: Info Card -->
          <div class="lg:col-span-1">
              <div class="bg-gray-50 rounded-3xl p-8 border border-gray-100 sticky top-24">
                  <h1 class="text-2xl font-bold text-gray-900 mb-6 leading-tight">
                      {{ fund.meta.scheme_name }}
                  </h1>
                  
                  <div class="space-y-6">
                      <div class="flex items-center space-x-4">
                          <div class="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center border border-gray-100">
                              <Landmark class="w-5 h-5 text-indigo-500" />
                          </div>
                          <div>
                              <p class="text-xs text-gray-400 uppercase font-bold tracking-wider">Fund House</p>
                              <p class="text-sm font-semibold text-gray-700">{{ fund.meta.fund_house }}</p>
                          </div>
                      </div>

                      <div class="flex items-center space-x-4">
                          <div class="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center border border-gray-100">
                              <Layers class="w-5 h-5 text-indigo-500" />
                          </div>
                          <div>
                              <p class="text-xs text-gray-400 uppercase font-bold tracking-wider">Category</p>
                              <p class="text-sm font-semibold text-gray-700">{{ fund.meta.scheme_category }}</p>
                          </div>
                      </div>

                      <div class="flex items-center space-x-4">
                          <div class="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center border border-gray-100">
                              <Tag class="w-5 h-5 text-indigo-500" />
                          </div>
                          <div>
                              <p class="text-xs text-gray-400 uppercase font-bold tracking-wider">Scheme Type</p>
                              <p class="text-sm font-semibold text-gray-700">{{ fund.meta.scheme_type }}</p>
                          </div>
                      </div>

                      <div class="pt-6 border-t border-gray-200">
                          <div class="flex justify-between items-end">
                              <div>
                                  <p class="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Latest NAV</p>
                                  <p class="text-4xl font-extrabold text-indigo-600">₹{{ latestNav }}</p>
                              </div>
                              <div class="text-right">
                                  <p class="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Update Date</p>
                                  <p class="text-sm font-semibold text-gray-600">{{ latestDate }}</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <!-- Right Column: Chart & Table -->
          <div class="lg:col-span-2 space-y-12">
              <!-- Chart Area -->
              <div>
                  <div class="flex items-center justify-between mb-6">
                      <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
                          <Calendar class="w-5 h-5 text-indigo-600" />
                          NAV History
                      </h2>
                      <div class="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
                          <button 
                              v-for="range in ['1M', '6M', '1Y', 'ALL']" 
                              :key="range"
                              @click="dateRange = range"
                              :class="['px-4 py-1.5 rounded-lg text-xs font-bold transition-all', dateRange === range ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-400 hover:text-indigo-600']"
                          >
                              {{ range }}
                          </button>
                      </div>
                  </div>
                  
                  <div class="w-full h-[400px] bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative">
                    <Line v-if="chartData" :data="chartData" :options="chartOptions" />
                  </div>
              </div>

              <!-- Recent History Table -->
              <div>
                  <div class="flex items-center justify-between mb-6">
                      <h2 class="text-xl font-bold text-gray-900 flex items-center gap-2">
                          <Info class="w-5 h-5 text-indigo-600" />
                          Recent Daily NAV
                      </h2>
                  </div>
                  <div class="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                      <table class="w-full text-left">
                          <thead class="bg-gray-50/50">
                              <tr>
                                  <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                  <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">NAV (₹)</th>
                                  <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Change</th>
                              </tr>
                          </thead>
                          <tbody class="divide-y divide-gray-50">
                              <tr v-for="(item, idx) in fund.data.slice(0, 10)" :key="item.date">
                                  <td class="px-6 py-4 text-sm font-medium text-gray-600">{{ item.date }}</td>
                                  <td class="px-6 py-4 text-sm font-mono font-bold text-indigo-600">{{ item.nav }}</td>
                                  <td class="px-6 py-4 text-sm">
                                      <span v-if="fund.data[idx+1]" :class="[item.nav > fund.data[idx+1].nav ? 'text-green-500' : 'text-red-500', 'font-bold']">
                                          {{ item.nav > fund.data[idx+1].nav ? '+' : '' }}
                                          {{ (( (item.nav - fund.data[idx+1].nav) / fund.data[idx+1].nav) * 100).toFixed(2) }}%
                                      </span>
                                      <span v-else>-</span>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft, Landmark, Layers, Tag, Info, Calendar } from 'lucide-vue-next';
import axios from 'axios';
import Loader from '../components/Loader.vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const route = useRoute();
const router = useRouter();
const fund = ref(null);
const loading = ref(true);
const error = ref(null);
const dateRange = ref('1Y');

const latestNav = computed(() => fund.value?.data?.[0]?.nav || 'N/A');
const latestDate = computed(() => fund.value?.data?.[0]?.date || 'N/A');

const fetchDetails = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`/api/scheme/${route.params.code}`);
    fund.value = response.data;
  } catch (err) {
    error.value = 'Failed to load fund details. Please try again later.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchDetails);

const filteredData = computed(() => {
  if (!fund.value?.data) return [];
  const limit = dateRange.value === '1M' ? 30 : dateRange.value === '6M' ? 180 : dateRange.value === '1Y' ? 365 : fund.value.data.length;
  return [...fund.value.data.slice(0, limit)].reverse();
});

const chartData = computed(() => {
  if (filteredData.value.length === 0) return null;
  return {
    labels: filteredData.value.map(d => d.date),
    datasets: [{
      label: 'NAV',
      backgroundColor: '#4f46e5',
      borderColor: '#4f46e5',
      data: filteredData.value.map(d => parseFloat(d.nav)),
      fill: false,
      tension: 0.1,
      pointRadius: 0,
      hitRadius: 10,
    }]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      mode: 'index',
      intersect: false,
      backgroundColor: '#1e1b4b',
      titleColor: '#fff',
      bodyColor: '#fff',
      padding: 12,
      borderRadius: 12,
    }
  },
  scales: {
    x: {
      display: true,
      grid: { display: false },
      ticks: {
        maxTicksLimit: 8,
        color: '#94a3b8',
        font: { size: 10 }
      }
    },
    y: {
      display: true,
      grid: { color: '#f1f5f9' },
      ticks: {
        color: '#94a3b8',
        font: { size: 10 }
      }
    }
  }
};
</script>
