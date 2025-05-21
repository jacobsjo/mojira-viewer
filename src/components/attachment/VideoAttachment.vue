<script setup lang="ts">
import { ref } from 'vue';
import { useTemplateRef } from 'vue';
import { watch } from 'vue';

const props = defineProps({
    id: String,
    active: Boolean
})

const video = useTemplateRef<HTMLVideoElement>('video')
const loaded = ref(false)

watch(props, () => {
    if (!props.active) {
        video.value?.pause()
    } else {
        loaded.value = true
        video.value?.play()
    }
})

function clickPlayer(evt: MouseEvent){
    if (props.active){
        evt.stopPropagation()
    }
}

</script>

<template>
    <video v-if="loaded" width="10000" ref="video" :controls="props.active" @click="clickPlayer" autoplay>
        <source :src="`https://bugs.mojang.com/api/issue-attachment-get?attachmentId=${props.id}`" />
    </video>
    <font-awesome-icon v-else class="icon" :icon="['fas', 'film']" />
</template>

<style scoped>
video {
    max-width: 100%;
    max-height: 60rem;
}

.icon {
    width: 3rem;
    height: 3rem;
}
</style>