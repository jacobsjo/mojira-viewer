<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { watch } from 'vue';

const props = defineProps({
    id: String,
    active: Boolean
})

const video = useTemplateRef<HTMLVideoElement>('video')

watch(props, () => {
    if (!props.active) {
        video.value?.pause()
    } else {
        video.value?.play()
    }
})

</script>

<template>
    <video width="10000" ref="video" :controls="props.active">
        <source :src="`https://bugs.mojang.com/api/issue-attachment-get?attachmentId=${props.id}`" />
    </video>
</template>

<style scoped>
video {
    max-width: 100%;
    max-height: 100%;
}
</style>