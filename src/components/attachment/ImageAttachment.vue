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
    max-height: 100%;
    max-width: 100%;
}
</style>