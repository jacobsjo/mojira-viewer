
<script setup lang="ts">
import InternalLink from './InternalLink.vue';
</script>

<template>
    <div class="footer">
        <span>Copyright © 2025 jacobsjo</span>
        <span>NOT AN OFFICIAL MINECRAFT SERVICE. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.</span>
        <InternalLink to="/about">About</InternalLink>
        <a href="https://github.com/jacobsjo/mojira-viewer" target="_blank">Viewer Sourcecode</a>
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
    }

    .footer a{
        color: var(--text-color)
    }
</style>