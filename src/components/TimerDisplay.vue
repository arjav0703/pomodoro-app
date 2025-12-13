<script setup lang="ts">
defineProps<{
    minutes: string;
    seconds: string;
}>();
</script>

<template>
    <div
        class="rounded-3xl p-8 md:p-16 mb-8"
    >
        <div class="timer-display">
            {{ minutes }}<span class="colon">:</span>{{ seconds }}
        </div>
    </div>
</template>

<style scoped>
.timer-display {
    font-size: 120px;
    font-weight: 900;
    line-height: 1;
    letter-spacing: -0.02em;
    user-select: none;
    font-family:
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        sans-serif;
}

@media (min-width: 640px) {
    .timer-display {
        font-size: 160px;
    }
}

@media (min-width: 1024px) {
    .timer-display {
        font-size: 200px;
    }
}

.colon {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    display: inline-block;
}

@keyframes pulse {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.3;
    }
}
</style>
