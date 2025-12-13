import { ref, computed, onUnmounted } from "vue";
import { save_to_store, get_from_store } from "./tauri";

export type TimerMode = "pomodoro" | "shortBreak" | "longBreak";

const DEFAULT_POMODORO_TIME = 25;
const DEFAULT_SHORT_BREAK_TIME = 5;
const DEFAULT_LONG_BREAK_TIME = 15;

export function useTimer() {
  const mode = ref<TimerMode>("pomodoro");
  const isRunning = ref(false);
  const pomodorosCompleted = ref(0);

  // Customizable durations (in minutes)
  const pomodoroDuration = ref(DEFAULT_POMODORO_TIME);
  const shortBreakDuration = ref(DEFAULT_SHORT_BREAK_TIME);
  const longBreakDuration = ref(DEFAULT_LONG_BREAK_TIME);

  const timeLeft = ref(pomodoroDuration.value * 60);

  // Initialize from store asynchronously
  get_from_store("pomodorosCompleted").then((val) => {
    if (val !== undefined && typeof val === "object" && "value" in val) {
      pomodorosCompleted.value = val.value;
    } else if (val !== undefined && typeof val === "number") {
      pomodorosCompleted.value = val;
    }
  });

  get_from_store("pomodoroDuration").then((val) => {
    if (val !== undefined && typeof val === "number") {
      pomodoroDuration.value = val;
      if (mode.value === "pomodoro" && !isRunning.value) {
        timeLeft.value = val * 60;
      }
    }
  });

  get_from_store("shortBreakDuration").then((val) => {
    if (val !== undefined && typeof val === "number") {
      shortBreakDuration.value = val;
      if (mode.value === "shortBreak" && !isRunning.value) {
        timeLeft.value = val * 60;
      }
    }
  });

  get_from_store("longBreakDuration").then((val) => {
    if (val !== undefined && typeof val === "number") {
      longBreakDuration.value = val;
      if (mode.value === "longBreak" && !isRunning.value) {
        timeLeft.value = val * 60;
      }
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
        timeLeft.value = pomodoroDuration.value * 60;
        break;
      case "shortBreak":
        timeLeft.value = shortBreakDuration.value * 60;
        break;
      case "longBreak":
        timeLeft.value = longBreakDuration.value * 60;
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
        timeLeft.value = pomodoroDuration.value * 60;
        break;
      case "shortBreak":
        timeLeft.value = shortBreakDuration.value * 60;
        break;
      case "longBreak":
        timeLeft.value = longBreakDuration.value * 60;
        break;
    }
  }

  function setTimerDurations(
    pomodoro: number,
    shortBreak: number,
    longBreak: number,
  ) {
    pomodoroDuration.value = pomodoro;
    shortBreakDuration.value = shortBreak;
    longBreakDuration.value = longBreak;

    save_to_store("pomodoroDuration", pomodoro);
    save_to_store("shortBreakDuration", shortBreak);
    save_to_store("longBreakDuration", longBreak);

    // Update current timer if not running
    if (!isRunning.value) {
      resetTimer();
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
    pomodoroDuration,
    shortBreakDuration,
    longBreakDuration,
    minutes,
    seconds,
    formattedMinutes,
    formattedSeconds,
    backgroundColor,
    startTimer,
    pauseTimer,
    resetTimer,
    setMode,
    setTimerDurations,
  };
}
