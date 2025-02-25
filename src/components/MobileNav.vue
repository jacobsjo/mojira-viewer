
<script setup lang="ts">
import { useSettingsStore } from '../stores/SettingsStore';
import InternalLink from './InternalLink.vue';

const settingsStore = useSettingsStore()

const showSearch = defineModel('showSearch')

</script>


<template>
    <div class="mobileNav">
        <InternalLink to="/browse" class="button"><font-awesome-icon :icon="['fas', 'bars']" /></InternalLink>
        <button class="button search" :class="{active: showSearch}" tabindex="0" @click="showSearch = !showSearch"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
        <div class="gap" />
        <button class="button darkmode-switcher" tabindex="0" @click="settingsStore.darkMode = !settingsStore.darkMode"><font-awesome-icon :icon="['fas', settingsStore.darkMode ? 'sun' : 'moon']" /></button>
        <InternalLink to="/" class="button"><font-awesome-icon :icon="['fas', 'house']" /></InternalLink>
    </div>
</template>


<style scoped>
    .mobileNav {
        display: flex;
        gap: 1rem;
        padding: 0.4rem 1rem;
    }

    .gap {
        flex-grow: 1;
    }

    .button {
        color: var(--text-color);
        background: none;
        border: none;
        font: inherit;
        outline: invert;
        font-size: 17pt;
        cursor: pointer;
        padding: 0;
        margin: 0;
        width: 17pt;
        height: 20pt;        
    }

    .button.active, .button.router-link-active {
        color: var(--accent2-color);
    }

    .button.router-link-active {
        cursor: default;
    }
</style>