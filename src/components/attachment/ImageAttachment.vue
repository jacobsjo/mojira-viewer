<script setup lang="ts">
import { useTemplateRef } from 'vue';
import InternalLink from '../InternalLink.vue'
import { useRoute } from 'vue-router'

const props = defineProps({
    id: String,
})

</script>

<template>
    <img :src="`https://bugs.mojang.com/api/issue-attachment-get?attachmentId=${props.id}`"/>
</template>

<style scoped>
img {
    width: 10000px;
    max-width: 100%;
    max-height: 60rem;
    object-fit: contain;

}
</style>