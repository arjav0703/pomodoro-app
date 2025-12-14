<script setup lang="ts">
import { ref, watch } from "vue";
import { X } from "lucide-vue-next";

const props = defineProps<{
    isOpen: boolean;
    pomodoroDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
}>();

const emit = defineEmits<{
    close: [];
    save: [pomodoro: number, shortBreak: number, longBreak: number];
}>();

const pomodoroMinutes = ref(props.pomodoroDuration);
const shortBreakMinutes = ref(props.shortBreakDuration);
const longBreakMinutes = ref(props.longBreakDuration);

// Update local values when props change
watch(
    () => props.pomodoroDuration,
    (newVal) => (pomodoroMinutes.value = newVal),
);
watch(
    () => props.shortBreakDuration,
    (newVal) => (shortBreakMinutes.value = newVal),
);
watch(
    () => props.longBreakDuration,
    (newVal) => (longBreakMinutes.value = newVal),
);

function handleSave() {
    // Validate inputs
    const pomodoro = Math.max(1, pomodoroMinutes.value);
    const shortBreak = Math.max(1, Math.min(60, shortBreakMinutes.value));
    const longBreak = Math.max(1, longBreakMinutes.value);

    emit("save", pomodoro, shortBreak, longBreak);
    emit("close");
}

function handleClose() {
    // Reset to props values
    pomodoroMinutes.value = props.pomodoroDuration;
    shortBreakMinutes.value = props.shortBreakDuration;
    longBreakMinutes.value = props.longBreakDuration;
    emit("close");
}

function handleBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
        handleClose();
    }
}
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div
                v-if="isOpen"
                @click="handleBackdropClick"
                class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            >
                <div
                    class="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border-2 border-white/30 p-8 w-full max-w-md relative"
                    @click.stop
                >
                    <button
                        @click="handleClose"
                        class="absolute top-4 right-4 w-10 h-10 rounded-full hover:bg-white/20 flex items-center justify-center transition-all"
                        aria-label="Close settings"
                        type="button"
                    >
                        <X :size="24" class="text-white" />
                    </button>

                    <h2 class="text-3xl font-bold text-white mb-6 text-center">
                        Timer Settings
                    </h2>

                    <div class="space-y-6">
                        <div>
                            <label
                                for="pomodoro"
                                class="block text-sm font-bold text-white mb-2"
                            >
                                Pomodoro Duration (minutes)
                            </label>
                            <input
                                id="pomodoro"
                                v-model.number="pomodoroMinutes"
                                type="number"
                                min="1"
                                class="w-full px-4 py-3 rounded-xl border-2 border-white/30 backdrop-blur-xl bg-white/10 focus:border-white/50 focus:bg-white/20 focus:outline-none text-white font-semibold text-lg"
                            />
                        </div>

                        <div>
                            <label
                                for="shortBreak"
                                class="block text-sm font-bold text-white mb-2"
                            >
                                Short Break Duration (minutes)
                            </label>
                            <input
                                id="shortBreak"
                                v-model.number="shortBreakMinutes"
                                type="number"
                                min="1"
                                max="60"
                                class="w-full px-4 py-3 rounded-xl border-2 border-white/30 backdrop-blur-xl bg-white/10 focus:border-white/50 focus:bg-white/20 focus:outline-none text-white font-semibold text-lg"
                            />
                        </div>

                        <div>
                            <label
                                for="longBreak"
                                class="block text-sm font-bold text-white mb-2"
                            >
                                Long Break Duration (minutes)
                            </label>
                            <input
                                id="longBreak"
                                v-model.number="longBreakMinutes"
                                type="number"
                                min="1"
                                class="w-full px-4 py-3 rounded-xl border-2 border-white/30 backdrop-blur-xl bg-white/10 focus:border-white/50 focus:bg-white/20 focus:outline-none text-white font-semibold text-lg"
                            />
                        </div>
                    </div>

                    <div class="flex gap-3 mt-8">
                        <button
                            @click="handleClose"
                            class="flex-1 px-6 py-3 rounded-xl font-bold text-white backdrop-blur-xl bg-white/10 border-2 border-white/30 hover:bg-white/20 transition-all active:scale-95"
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            @click="handleSave"
                            class="flex-1 px-6 py-3 rounded-xl font-bold text-white backdrop-blur-xl bg-white/30 border-2 border-white/50 hover:bg-white/40 transition-all shadow-2xl active:scale-95"
                            type="button"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-active > div,
.modal-leave-active > div {
    transition: transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-from > div,
.modal-leave-to > div {
    transform: scale(0.9);
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    opacity: 1;
}
</style>
