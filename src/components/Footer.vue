
<script setup lang="ts">
import InternalLink from './InternalLink.vue';
</script>

<template>
    <div class="footer">
        <span>NOT AN OFFICIAL MINECRAFT SERVICE. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.</span>
        <span>Copyright © 2025 jacobsjo</span>
        <InternalLink to="/about">About</InternalLink>
        <a href="https://github.com/jacobsjo/mojira-viewer" target="_blank">Source code</a>
    </div>
</template>

<style scoped>
    .footer {
        height: 1rem;
        display: flex;
        flex-direction: row;
        gap: 1rem;
        overflow: hidden;
        font-size: small;
        background-color: var(--footer-bg-color);
        border-top: 1px solid var(--main-border-color);
        white-space: nowrap;
    }

    .footer a{
        color: var(--text-color)
    }
</style>