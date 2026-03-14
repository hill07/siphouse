<template>
  <div class="flex justify-center items-center py-12">
    <div :class="[sizeClasses[size], 'border-indigo-200 border-t-indigo-600 rounded-full animate-spin']"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'md'
  }
});

const sizeClasses = {
  sm: "w-6 h-6 border-2",
  md: "w-10 h-10 border-[3px]",
  lg: "w-16 h-16 border-4"
};
</script>
