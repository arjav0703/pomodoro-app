<script setup lang="ts">
export type TimerMode = "pomodoro" | "shortBreak" | "longBreak";
import { Clock, Settings } from "lucide-vue-next";

defineProps<{
    currentMode: TimerMode;
}>();

defineEmits<{
    changeMode: [mode: TimerMode];
    openSettings: [];
}>();
</script>

<template>
    <div class="dropdown dropdown-left text-white fixed top-5 right-5">
        <div
            tabindex="0"
            role="button"
            class="rounded-full backdrop-blur-xl bg-white/20 border-white/30 border-2 px-2 py-2 btn w-auto h-auto text-white"
        >
            <Clock :size="40" :stroke-width="2" />
        </div>
        <ul
            tabindex="-1"
            class="dropdown-content menu backdrop-blur-xl bg-white/20 border-white/30 border-2 rounded-box z-1 w-52 p-2 mx-4 shadow-2xl"
        >
            <li>
                <button
                    @click="$emit('changeMode', 'pomodoro')"
                    :class="[
                        'px-4 py-3 rounded-lg font-bold text-md active:scale-95 text-white',
                        currentMode === 'pomodoro'
                            ? 'bg-white/30 border-2 border-white/50'
                            : 'hover:bg-white/10',
                    ]"
                >
                    Pomodoro
                </button>
            </li>
            <li>
                <button
                    @click="$emit('changeMode', 'shortBreak')"
                    :class="[
                        'px-4 py-2 rounded-lg font-bold text-md active:scale-95 text-white',
                        currentMode === 'shortBreak'
                            ? 'bg-white/30 border-2 border-white/50'
                            : 'hover:bg-white/10',
                    ]"
                >
                    Short Break
                </button>
            </li>
            <li>
                <button
                    @click="$emit('changeMode', 'longBreak')"
                    :class="[
                        'px-4 py-2 rounded-lg font-bold text-md active:scale-95 text-white',
                        currentMode === 'longBreak'
                            ? 'bg-white/30 border-2 border-white/50'
                            : 'hover:bg-white/10',
                    ]"
                >
                    Long Break
                </button>
            </li>
            <li class="border-t border-white/20 mt-2 pt-2">
                <button
                    @click="$emit('openSettings')"
                    class="px-4 py-2 rounded-lg font-bold text-md active:scale-95 text-white hover:bg-white/10 flex items-center gap-2"
                >
                    <Settings :size="18" />
                    Settings
                </button>
            </li>
        </ul>
    </div>
</template>
