import { defineStore } from "pinia";
import { ref } from "vue";


export const useSettingsStore = defineStore('setingsStore', () => {
    const darkMode = ref(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)

    return { darkMode }
})