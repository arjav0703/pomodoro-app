<script setup lang="ts">
defineProps<{
    isRunning: boolean;
}>();

defineEmits<{
    start: [];
    pause: [];
    reset: [];
}>();
</script>

<template>
    <div class="flex gap-4 mb-8 justify-center flex-wrap">
        <button
            v-if="!isRunning"
            @click="$emit('start')"
            class="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all shadow-lg hover:scale-105 active:scale-95"
        >
            ▶ Start
        </button>
        <button
            v-else
            @click="$emit('pause')"
            class="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all shadow-lg hover:scale-105 active:scale-95"
        >
            ⏸ Pause
        </button>
        <button
            @click="$emit('reset')"
            class="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all shadow-lg hover:scale-105 active:scale-95"
        >
            ↻ Reset
        </button>
    </div>
</template>
