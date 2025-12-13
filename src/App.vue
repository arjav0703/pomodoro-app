<script setup lang="ts">
import { useTimer } from "./composables/useTimer";
import TimerDisplay from "./components/TimerDisplay.vue";
import TimerControls from "./components/TimerControls.vue";
import ModeSelector from "./components/ModeSelector.vue";

const {
    mode,
    isRunning,
    pomodorosCompleted,
    formattedMinutes,
    formattedSeconds,
    modeTitle,
    backgroundColor,
    startTimer,
    pauseTimer,
    resetTimer,
    setMode,
} = useTimer();
</script>

<template>
    <div
        :class="[
            'min-h-screen flex flex-col items-center justify-center transition-colors duration-500 p-8',
            backgroundColor,
        ]"
    >
        <div class="text-center w-full max-w-4xl">
            <h1
                class="text-4xl md:text-5xl font-bold text-white mb-6 tracking-wide drop-shadow-lg"
            >
                {{ modeTitle }}
            </h1>

            <div
                class="text-white text-xl md:text-2xl mb-8 opacity-90 drop-shadow"
            >
                🍅 Pomodoros completed: {{ pomodorosCompleted }}
            </div>

            <TimerDisplay
                :minutes="formattedMinutes"
                :seconds="formattedSeconds"
            />

            <TimerControls
                :is-running="isRunning"
                @start="startTimer"
                @pause="pauseTimer"
                @reset="resetTimer"
            />

            <ModeSelector :current-mode="mode" @change-mode="setMode" />
        </div>
    </div>
</template>
