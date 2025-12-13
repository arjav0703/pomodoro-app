import { ref, computed, onUnmounted } from "vue";
import { save_to_store, get_from_store } from "./tauri";

export type TimerMode = "pomodoro" | "shortBreak" | "longBreak";

const POMODORO_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 15 * 60;

export function useTimer() {
  const mode = ref<TimerMode>("pomodoro");
  const timeLeft = ref(POMODORO_TIME);
  const isRunning = ref(false);
  const pomodorosCompleted = ref(0);

  // Initialize from store asynchronously
  get_from_store("pomodorosCompleted").then((val) => {
    if (val !== undefined && typeof val === "object" && "value" in val) {
      pomodorosCompleted.value = val.value;
    } else if (val !== undefined && typeof val === "number") {
      pomodorosCompleted.value = val;
    }
  });

  let intervalId: number | null = null;

  // Computed properties
  const minutes = computed(() => Math.floor(timeLeft.value / 60));
  const seconds = computed(() => timeLeft.value % 60);

  const formattedMinutes = computed(() =>
    String(minutes.value).padStart(2, "0"),
  );
  const formattedSeconds = computed(() =>
    String(seconds.value).padStart(2, "0"),
  );

  const modeTitle = computed(() => {
    switch (mode.value) {
      case "pomodoro":
        return "Focus Time";
      case "shortBreak":
        return "Short Break";
      case "longBreak":
        return "Long Break";
    }
  });

  const backgroundColor = computed(() => {
    switch (mode.value) {
      case "pomodoro":
        return "bg-rose-600";
      case "shortBreak":
        return "bg-emerald-600";
      case "longBreak":
        return "bg-sky-600";
    }
  });

  function startTimer() {
    if (isRunning.value) return;

    isRunning.value = true;
    intervalId = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--;
      } else {
        completeTimer();
      }
    }, 1000);
  }

  function pauseTimer() {
    isRunning.value = false;
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function resetTimer() {
    pauseTimer();
    switch (mode.value) {
      case "pomodoro":
        timeLeft.value = POMODORO_TIME;
        break;
      case "shortBreak":
        timeLeft.value = SHORT_BREAK_TIME;
        break;
      case "longBreak":
        timeLeft.value = LONG_BREAK_TIME;
        break;
    }
  }

  function completeTimer() {
    pauseTimer();

    if (mode.value === "pomodoro") {
      pomodorosCompleted.value++;
      save_to_store("pomodorosCompleted", pomodorosCompleted.value);

      // After 4 pomodoros, take a long break
      if (pomodorosCompleted.value % 4 === 0) {
        setMode("longBreak");
      } else {
        setMode("shortBreak");
      }
    } else {
      setMode("pomodoro");
    }
  }

  function setMode(newMode: TimerMode) {
    pauseTimer();
    mode.value = newMode;

    switch (newMode) {
      case "pomodoro":
        timeLeft.value = POMODORO_TIME;
        break;
      case "shortBreak":
        timeLeft.value = SHORT_BREAK_TIME;
        break;
      case "longBreak":
        timeLeft.value = LONG_BREAK_TIME;
        break;
    }
  }

  // Cleanup on unmount
  onUnmounted(() => {
    if (intervalId !== null) {
      clearInterval(intervalId);
    }
  });

  return {
    mode,
    timeLeft,
    isRunning,
    pomodorosCompleted,
    minutes,
    seconds,
    formattedMinutes,
    formattedSeconds,
    modeTitle,
    backgroundColor,
    startTimer,
    pauseTimer,
    resetTimer,
    setMode,
  };
}
