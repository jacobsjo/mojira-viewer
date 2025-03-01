
<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import InternalLink from './InternalLink.vue';

const isDark = useDark()
const toggleDark = useToggle(isDark)

const showSearch = defineModel('showSearch')

</script>


<template>
    <div class="mobileNav">
        <InternalLink to="/browse" class="mobile-button"><font-awesome-icon :icon="['fas', 'bars']" /></InternalLink>
        <button class="mobile-button" :class="{active: showSearch}" tabindex="0" @click="showSearch = !showSearch"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
        <div class="gap" />
        <button class="mobile-button darkmode-switcher" tabindex="0" @click="toggleDark()"><font-awesome-icon :icon="['fas', isDark ? 'sun' : 'moon']" /></button>
        <InternalLink to="/" class="mobile-button"><font-awesome-icon :icon="['fas', 'house']" /></InternalLink>
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

    .mobile-button {
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

    .mobile-button.active, .mobile-button.router-link-active {
        color: var(--accent2-color);
    }

    .mobile-button.router-link-active {
        cursor: default;
    }
</style>