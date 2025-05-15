<script setup lang="ts">
const props = defineProps({
    id: String,
})
</script>

<template>
    <a class="download" :href="`https://bugs.mojang.com/api/issue-attachment-get?attachmentId=${props.id}`" download>
        <font-awesome-icon class="icon" :icon="['fas', 'download']" />
    </a>
</template>

<style scoped>
.download {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: unset;
}

.download:hover {
    color: var(--accent2-color);
}

.icon {
    width: 3rem;
    height: 3rem;
}
</style>