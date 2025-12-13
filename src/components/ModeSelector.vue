<script setup lang="ts">
export type TimerMode = "pomodoro" | "shortBreak" | "longBreak";
import {Clock} from "lucide-vue-next";

defineProps<{
    currentMode: TimerMode;
}>();

defineEmits<{
    changeMode: [mode: TimerMode];
}>();
</script>

<template>
    <div class="dropdown dropdown-left text-black absolute top-5 right-5">
        <div tabindex="0" role="button" class="rounded-full bg-white border-2 px-2 py-2 btn w-auto h-auto text-black"><Clock :size="40" :stroke-width="2" /></div>
          <ul tabindex="-1" class="dropdown-content menu bg-white rounded-box z-1 w-52 p-2 mx-4 ">
<li>

        <button
            @click="$emit('changeMode', 'pomodoro')"
            :class="[
                'px-4 py-3 rounded-lg font-bold text-md active:scale-95',
                currentMode === 'pomodoro'
                    ? 'bg-white border-2 border-black'
                    : 'bg-white  ',
            ]"
        >
            Pomodoro
        </button></li>
        <li>
        <button
            @click="$emit('changeMode', 'shortBreak')"
            :class="[

                'px-4 py-2 rounded-lg font-bold text-md active:scale-95',
                currentMode === 'shortBreak'
                    ? 'bg-white border-2 border-black'
                    : 'bg-white text-gray-900 ',
            ]"
        >
            Short Break
        </button>
        </li>
        <li>
        <button
            @click="$emit('changeMode', 'longBreak')"
            :class="[
                'px-4 py-2 rounded-lg font-bold text-md active:scale-95',
                currentMode === 'longBreak'
                    ? 'bg-white border-2 border-black'
                    : 'bg-white',
            ]"
        >
            Long Break
        </button>
        </li>
        </ul>
    </div>
</template>
