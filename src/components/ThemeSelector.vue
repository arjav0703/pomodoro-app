<script setup lang="ts">
import { ref } from "vue";
import { Sun, Moon, Palette, Heart } from "lucide-vue-next";
import type { Theme } from "../composables/useTheme";

const props = defineProps<{
    currentTheme: Theme;
}>();

const emit = defineEmits<{
    changeTheme: [theme: Theme];
}>();

const isOpen = ref(false);

const themes: { name: Theme; icon: any; color: string }[] = [
    { name: "Warm", icon: Sun, color: "bg-rose-500" },
    { name: "Purple", icon: Moon, color: "bg-purple-500" },
    { name: "Dark", icon: Palette, color: "bg-slate-700" },
    { name: "Pink", icon: Heart, color: "bg-pink-500" },
];

function toggleMenu() {
    isOpen.value = !isOpen.value;
}

function selectTheme(theme: Theme) {
    emit("changeTheme", theme);
    isOpen.value = false;
}
</script>

<template>
    <div class="fixed bottom-8 right-8 z-50">
        <!-- Theme option buttons (appear when open) -->
        <div v-if="isOpen" class="flex flex-col-reverse gap-3 mb-3 items-end">
            <button
                v-for="theme in themes"
                :key="theme.name"
                @click.stop="selectTheme(theme.name)"
                :class="[
                    'w-12 h-12 rounded-full shadow-2xl backdrop-blur-xl',
                    'flex items-center justify-center',
                    'transition-all duration-200 hover:scale-110 active:scale-95',
                    'border-2 border-white/30',
                    theme.color,
                    props.currentTheme === theme.name
                        ? 'ring-4 ring-white ring-opacity-60'
                        : 'opacity-90',
                ]"
                :title="`${theme.name} theme`"
                :aria-label="`Select ${theme.name} theme`"
                type="button"
            >
                <component :is="theme.icon" :size="20" class="text-white" />
            </button>
        </div>

        <!-- Main FAB button -->
        <button
            @click.stop="toggleMenu"
            :class="[
                'w-14 h-14 rounded-full shadow-2xl',
                'flex items-center justify-center',
                'transition-all duration-200 hover:scale-110 active:scale-95',
                'backdrop-blur-xl bg-white/90 text-gray-800',
                'border-2 border-white/50',
            ]"
            :style="{
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }"
            :aria-label="
                isOpen ? 'Close theme selector' : 'Open theme selector'
            "
            :aria-expanded="isOpen"
            type="button"
        >
            <Palette :size="28" />
        </button>
    </div>
</template>

<style scoped>
button {
    -webkit-tap-highlight-color: transparent;
}
</style>
