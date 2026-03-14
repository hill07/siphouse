<template>
  <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <Activity class="w-8 h-8 text-indigo-600" />
            <span class="text-xl font-bold text-gray-900 tracking-tight">SIP<span class="text-indigo-600">House</span></span>
          </router-link>
        </div>
        <div class="hidden sm:flex items-center space-x-8">
          <router-link to="/" class="text-gray-600 hover:text-indigo-600 flex items-center space-x-1 transition-colors">
            <Home class="w-4 h-4" />
            <span>Home</span>
          </router-link>
          <router-link to="/schemes" class="text-gray-600 hover:text-indigo-600 flex items-center space-x-1 transition-colors">
            <List class="w-4 h-4" />
            <span>Explore</span>
          </router-link>
          <router-link to="/docs" class="text-gray-600 hover:text-indigo-600 flex items-center space-x-1 transition-colors">
            <FileText class="w-4 h-4" />
            <span>API Docs</span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { Home, List, FileText, Activity } from 'lucide-vue-next';
</script>
