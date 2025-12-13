import { ref } from "vue";
import { save_to_store, get_from_store } from "./tauri";

export type Theme = "Warm" | "Purple" | "Dark" | "Pink";

const themeColors = {
  Warm: {
    pomodoro: "bg-rose-600",
    shortBreak: "bg-orange-500",
    longBreak: "bg-amber-500",
  },
  Purple: {
    pomodoro: "bg-purple-600",
    shortBreak: "bg-indigo-500",
    longBreak: "bg-violet-500",
  },
  Dark: {
    pomodoro: "bg-slate-800",
    shortBreak: "bg-slate-700",
    longBreak: "bg-slate-600",
  },
  Pink: {
    pomodoro: "bg-pink-600",
    shortBreak: "bg-fuchsia-500",
    longBreak: "bg-rose-400",
  },
};

export function useTheme() {
  const currentTheme = ref<Theme>("Warm");

  // Initialize from store asynchronously
  get_from_store("theme").then((val) => {
    if (val !== undefined && typeof val === "string" && val in themeColors) {
      currentTheme.value = val as Theme;
    }
  });

  function getThemeColor(mode: "pomodoro" | "shortBreak" | "longBreak") {
    return themeColors[currentTheme.value][mode];
  }

  function setTheme(theme: Theme) {
    currentTheme.value = theme;
    save_to_store("theme", theme);
  }

  return {
    currentTheme,
    getThemeColor,
    setTheme,
  };
}
