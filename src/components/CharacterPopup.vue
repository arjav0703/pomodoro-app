<script setup lang="ts">
import { ref, watch } from "vue";

export interface PopupEvent {
    type: "timerStart" | "timerEnd" | "breakStart" | "breakEnd";
    mode: "pomodoro" | "shortBreak" | "longBreak";
}

interface Props {
    show: boolean;
    event?: PopupEvent;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    close: [];
}>();

const isVisible = ref(false);
const isAnimatingOut = ref(false);

const messages: Record<string, string[]> = {
    timerStart: [
        "Purrrfect! it's time to work OwO!",
        "mrrrp, time to work :D",
        "Time to slayyyyyyyy!!! 🫶",
        "Ready to be awesome? Let's go! ⭐",
    ],
    timerEnd: [
        "WE DID IT 🥺",
        "Purrrrfect!! let's take a lil break UwU",
        "how about a lil nap? :3",
        "wohoooo!!! good job captain 🫡",
    ],
    breakStart: [
        "and..... the fun time starts meowwwwww!!! >//<",
        "ready to blast some nice music?? 🎧🎸",
        "let's get ready to rumble!! 🥊",
        "time to touch some grass 😌 :3",
    ],
    breakEnd: [
        "Break's over! Ready to rock? 🔥",
        "It's time to roll!!!!",
        "Back to action! You're on fire! 🌟",
        "Ahoy Captain! the break is over! Let's continue the voyage! 🚢",
    ],
};

const currentMessage = ref("");
const audioElement = ref<HTMLAudioElement | null>(null);
const imageUrl = ref("/images/character.jpeg");
const imageLoaded = ref(false);

function getMessage(eventType: string): string {
    const messageList = messages[eventType] || messages.timerStart;
    return messageList[Math.floor(Math.random() * messageList.length)];
}

function playAudio(eventType: string) {
    const audioMap: Record<string, string> = {
        timerStart: "/audio/timer-start.mp3",
        timerEnd: "/audio/timer-end.mp3",
        breakStart: "/audio/break-start.mp3",
        breakEnd: "/audio/break-end.mp3",
    };

    const audioPath = audioMap[eventType];
    if (audioPath) {
        // Create new audio element
        const audio = new Audio(audioPath);
        audio.volume = 0.7;
        audio.play().catch((err) => {
            console.log("Audio playback failed (file may not exist):", err);
        });
        audioElement.value = audio;
    }
}

watch(
    () => props.show,
    (newValue) => {
        if (newValue && props.event) {
            isVisible.value = true;
            isAnimatingOut.value = false;
            currentMessage.value = getMessage(props.event.type);
            playAudio(props.event.type);

            // Auto-hide after 4 seconds
            setTimeout(() => {
                closePopup();
            }, 4000);
        }
    },
);

function closePopup() {
    isAnimatingOut.value = true;

    // // Stop audio if playing
    // if (audioElement.value) {
    //     audioElement.value.pause();
    //     audioElement.value = null;
    // }

    setTimeout(() => {
        isVisible.value = false;
        isAnimatingOut.value = false;
        emit("close");
    }, 500);
}
</script>

<template>
    <Transition name="popup">
        <div
            v-if="isVisible"
            :class="[
                'fixed bottom-8 left-8 z-50 flex items-end gap-4',
                isAnimatingOut ? 'popup-leave-active' : '',
            ]"
        >
            <div class="relative">
                <div class="animate-bounce-in">
                    <div
                        class="relative w-32 h-32 rounded-full overflow-hidden border-2 border-white/30 shadow-2xl backdrop-blur-xl bg-white/20"
                    >
                        <div
                            class="w-full h-full flex items-center justify-center text-6xl backdrop-blur-xl bg-white/20"
                        >
                            😸
                        </div>
                        <img
                            :src="imageUrl"
                            alt="Your character"
                            class="absolute inset-0 w-full h-full object-cover"
                            @load="imageLoaded = true"
                            @error="imageLoaded = false"
                            v-show="imageLoaded"
                        />
                    </div>
                </div>

                <div
                    class="absolute -top-2 -right-2 text-4xl animate-wave drop-shadow-lg"
                >
                    😸
                </div>
            </div>

            <div class="relative animate-slide-in">
                <div
                    class="backdrop-blur-xl bg-white/90 text-gray-800 rounded-2xl px-6 py-4 shadow-2xl max-w-xs relative border-2 border-white/50"
                >
                    <div
                        class="absolute left-0 top-1/2 -translate-x-3 -translate-y-1/2 w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-r-[12px] border-r-white/90"
                    ></div>

                    <p class="text-lg font-bold leading-relaxed">
                        {{ currentMessage }}
                    </p>

                    <button
                        @click="closePopup"
                        class="absolute -top-2 -right-2 w-7 h-7 backdrop-blur-xl bg-white/90 text-gray-800 rounded-full flex items-center justify-center hover:bg-white transition-all hover:scale-110 active:scale-95 text-xl font-bold shadow-lg border-2 border-white/50"
                        aria-label="Close popup"
                    >
                        ×
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.popup-enter-active,
.popup-leave-active {
    transition: opacity 0.5s ease;
}

.popup-enter-from,
.popup-leave-to {
    opacity: 0;
}

@keyframes bounceIn {
    0% {
        transform: scale(0) translateY(50px);
        opacity: 0;
    }
    50% {
        transform: scale(1.1) translateY(-10px);
    }
    70% {
        transform: scale(0.9) translateY(5px);
    }
    100% {
        transform: scale(1) translateY(0);
        opacity: 1;
    }
}

.animate-bounce-in {
    animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Slide in animation for speech bubble */
@keyframes slideIn {
    0% {
        transform: translateX(-30px);
        opacity: 0;
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

.animate-slide-in {
    animation: slideIn 0.5s ease-out 0.3s both;
}

@keyframes pulse-glow {
    0%,
    100% {
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
    }
    50% {
        box-shadow: 0 0 40px rgba(255, 255, 255, 0.5);
    }
}
</style>
