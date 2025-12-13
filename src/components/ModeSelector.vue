<script setup lang="ts">
export type TimerMode = "pomodoro" | "shortBreak" | "longBreak";

defineProps<{
    currentMode: TimerMode;
}>();

defineEmits<{
    changeMode: [mode: TimerMode];
}>();
</script>

<template>
    <div class="flex gap-3 justify-center flex-wrap">
        <button
            @click="$emit('changeMode', 'pomodoro')"
            :class="[
                'px-6 py-3 rounded-lg font-bold text-lg transition-all shadow-lg hover:scale-105 active:scale-95',
                currentMode === 'pomodoro'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-900 hover:bg-gray-100',
            ]"
        >
            Pomodoro
        </button>
        <button
            @click="$emit('changeMode', 'shortBreak')"
            :class="[
                'px-6 py-3 rounded-lg font-bold text-lg transition-all shadow-lg hover:scale-105 active:scale-95',
                currentMode === 'shortBreak'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-900 hover:bg-gray-100',
            ]"
        >
            Short Break
        </button>
        <button
            @click="$emit('changeMode', 'longBreak')"
            :class="[
                'px-6 py-3 rounded-lg font-bold text-lg transition-all shadow-lg hover:scale-105 active:scale-95',
                currentMode === 'longBreak'
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-900 hover:bg-gray-100',
            ]"
        >
            Long Break
        </button>
    </div>
</template>
