<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core";

const greetMsg = ref("");
const name = ref("");

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  greetMsg.value = await invoke("greet", { name: name.value });
}
</script>

<template>
  <div id="app" class="bg-blue-400 min-h-screen flex flex-col items-center justify-center">
    <h1 class="text-xl">Pomodoro App</h1>
    <p>{{ greetMsg }}</p>
  </div>
</template>
