<script setup lang="ts">
import ImageAttachment from './ImageAttachment.vue'
import VideoAttachment from './VideoAttachment.vue'
import OtherAttachment from './OtherAttachment.vue'
import { ref } from 'vue';
import { computed } from 'vue';

const props = defineProps({
    attachment: Object,
})

const active = ref(false)

const canBeActive = computed(() => props.attachment?.mimeType.startsWith('image/') || props.attachment?.mimeType.startsWith('video/'))
function toggleActive() {
    if(canBeActive.value){
        active.value = !active.value
    }
}
</script>

<template>
    <div class="attachment" :class="{active: active, canBeActive: canBeActive}" @click="toggleActive">
        <div class="content">
            <ImageAttachment v-if="props.attachment?.mimeType.startsWith('image/')" :id="props.attachment?.id" />
            <VideoAttachment v-else-if="props.attachment?.mimeType.startsWith('video/')" :id="props.attachment?.id" :active="active" />
            <OtherAttachment v-else :id="props.attachment?.id" />
        </div>
        <p class="title" :title="props.attachment?.filename">
            {{ props.attachment?.filename }}
        </p>
    </div>
</template>

<style scoped>
.attachment {
    width: 15rem;
    border: 1px solid var(--accent2-color);
    border-radius: 0.3rem;
    overflow: hidden;
    padding: 0.5rem;
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    gap: 0rem;
}

.attachment.canBeActive {
    cursor: pointer;
}

.attachment.active {
    width: 100%;
}

.content {
    width: 100%;
    max-height: 8rem;
    min-height: 8rem;
    display: flex;
    align-items: center;
    justify-content: center;
}


.attachment.active .content {
    max-height: 50rem;
}


.title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: small;
}
</style>