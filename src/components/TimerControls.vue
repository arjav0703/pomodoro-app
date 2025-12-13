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
            class="backdrop-blur-xl bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold text-xl hover:bg-white/30 transition-all shadow-2xl hover:scale-105 active:scale-95"
        >
            ▶ Start
        </button>
        <button
            v-else
            @click="$emit('pause')"
            class="backdrop-blur-xl bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold text-xl hover:bg-white/30 transition-all shadow-2xl hover:scale-105 active:scale-95"
        >
            ⏸ Pause
        </button>
        <button
            @click="$emit('reset')"
            class="backdrop-blur-xl bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold text-xl hover:bg-white/30 transition-all shadow-2xl hover:scale-105 active:scale-95"
        >
            ↻ Reset
        </button>
    </div>
</template>
