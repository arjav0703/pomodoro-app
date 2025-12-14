<script setup lang="ts">
import { ref } from "vue";
import { useTimer } from "./composables/useTimer";
import { useTheme } from "./composables/useTheme";
import TimerDisplay from "./components/TimerDisplay.vue";
import TimerControls from "./components/TimerControls.vue";
import ModeSelector from "./components/ModeSelector.vue";
import ThemeSelector from "./components/ThemeSelector.vue";
import SettingsModal from "./components/SettingsModal.vue";
import CharacterPopup from "./components/CharacterPopup.vue";

const {
    mode,
    isRunning,
    pomodorosCompleted,
    pomodoroDuration,
    shortBreakDuration,
    longBreakDuration,
    formattedMinutes,
    formattedSeconds,
    startTimer,
    pauseTimer,
    resetTimer,
    setMode,
    setTimerDurations,
    popupEvent,
    showPopup,
    closePopup,
} = useTimer();

const {
    currentTheme,
    backgroundImage,
    getThemeColor,
    setTheme,
    setBackgroundImage,
    clearBackgroundImage,
} = useTheme();

const isSettingsOpen = ref(false);

function openSettings() {
    isSettingsOpen.value = true;
}

function closeSettings() {
    isSettingsOpen.value = false;
}

function saveSettings(pomodoro: number, shortBreak: number, longBreak: number) {
    setTimerDurations(pomodoro, shortBreak, longBreak);
}
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

        <!-- Content wrapper with relative positioning -->
        <div class="relative z-10 flex flex-col items-center justify-center">
            <div class="text-center">
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
            </div>
        </div>

        <div
            class="fixed top-5 right-25 text-white text-xl md:text-2xl backdrop-blur-xl bg-white/10 border-white/30 border-2 rounded-3xl px-3 py-3 shadow-2xl"
        >
            🍅 {{ pomodorosCompleted }}
        </div>

        <ModeSelector
            :current-mode="mode"
            @change-mode="setMode"
            @open-settings="openSettings"
        />

        <ThemeSelector
            :current-theme="currentTheme"
            :has-background="!!backgroundImage"
            @change-theme="setTheme"
            @upload-image="setBackgroundImage"
            @clear-image="clearBackgroundImage"
        />

        <!-- Settings Modal -->
        <SettingsModal
            :is-open="isSettingsOpen"
            :pomodoro-duration="pomodoroDuration"
            :short-break-duration="shortBreakDuration"
            :long-break-duration="longBreakDuration"
            @close="closeSettings"
            @save="saveSettings"
        />

        <CharacterPopup
            :show="showPopup"
            :event="popupEvent ?? undefined"
            @close="closePopup"
        />
    </div>
</template>
