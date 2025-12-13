<script setup lang="ts">
import { useTimer } from "./composables/useTimer";
import { useTheme } from "./composables/useTheme";
import TimerDisplay from "./components/TimerDisplay.vue";
import TimerControls from "./components/TimerControls.vue";
import ModeSelector from "./components/ModeSelector.vue";
import ThemeSelector from "./components/ThemeSelector.vue";

const {
    mode,
    isRunning,
    pomodorosCompleted,
    formattedMinutes,
    formattedSeconds,
    startTimer,
    pauseTimer,
    resetTimer,
    setMode,
} = useTimer();

const {
    currentTheme,
    backgroundImage,
    getThemeColor,
    setTheme,
    setBackgroundImage,
    clearBackgroundImage,
} = useTheme();
</script>

<template>
    <div
        :class="[
            'min-h-screen flex flex-col items-center justify-center transition-colors duration-500 p-8 text-white relative overflow-hidden',
            getThemeColor(mode),
        ]"
    >
        <!-- Background image overlay -->
        <div
            v-if="backgroundImage"
            class="absolute inset-0 bg-cover bg-center bg-no-repeat"
            :style="{ backgroundImage: `url(${backgroundImage})` }"
        ></div>

        <!-- Dark overlay for better text contrast -->
        <div v-if="backgroundImage" class="absolute inset-0 bg-black/40"></div>

        <div
            class="relative z-10 w-full flex flex-col items-center justify-center"
        >
            <div class="text-center w-full max-w-4xl">
                <div
                    class="text-white text-xl md:text-2xl mb-8 backdrop-blur-xl bg-white/10 border-white/30 border-2 rounded-2xl px-6 py-3 inline-block shadow-2xl"
                >
                    🍅 {{ pomodorosCompleted }}
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

        <ThemeSelector
            :current-theme="currentTheme"
            :has-background="!!backgroundImage"
            @change-theme="setTheme"
            @upload-image="setBackgroundImage"
            @clear-image="clearBackgroundImage"
        />
    </div>
</template>
