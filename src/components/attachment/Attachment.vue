<script setup lang="ts">
import ImageAttachment from './ImageAttachment.vue'
import VideoAttachment from './VideoAttachment.vue'
import TextAttachment from './TextAttachment.vue'
import { ref } from 'vue';

const props = defineProps({
    attachment: Object,
})

const mimeType = props.attachment?.mimeType ?? ''
const type = mimeType.startsWith('image/') ? 'image'
    : mimeType.startsWith('video/') ? 'video'
    : mimeType.startsWith('text/') || mimeType === 'application/json' ? 'text'
    : 'download'

const active = ref(false)

function clickAttachment(evt: MouseEvent) {
    if(type !== 'download'){
        active.value = !active.value
        evt.preventDefault()
    }
}

function formatFileSize(size: number) {
    var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return +((size / Math.pow(1024, i)).toFixed(2)) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}
</script>

<template>
    <a :href="active ? undefined : `https://bugs.mojang.com/api/issue-attachment-get?attachmentId=${props.attachment?.id}`" class="attachment" :class="{active: active}" @click.stop="clickAttachment" target="_blank">
        <div class="content">
            <Suspense>
                <ImageAttachment v-if="type === 'image'" :id="props.attachment?.id" />
                <VideoAttachment v-else-if="type === 'video'" :id="props.attachment?.id" :active="active" />
                <!--TextAttachment v-else-if="type === 'text'" :id="props.attachment?.id" :active="active"/-->
                <font-awesome-icon v-else class="icon" :icon="['fas', 'download']" />
            </Suspense>
        </div>
        <p class="title" :title="props.attachment?.filename">
            {{ props.attachment?.filename }}
        </p>
        <p class="size" :title="props.attachment?.filename">
            {{ formatFileSize(props.attachment?.size) }} {{ props.attachment?.mimeType }}
        </p>
    </a>
</template>

<style scoped>
.attachment {
    width: 15rem;
    height: 11rem;
    border: 1px solid var(--accent2-color);
    border-radius: 0.3rem;
    overflow: hidden;
    padding: 0.5rem;
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    cursor: pointer;
    color: unset;
    text-decoration: unset;
}

.attachment:hover {
    color: var(--accent2-color);
}

.attachment.active {
    width: 100%;
    height: unset;
}

.content {
    width: 100%;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

p {
    padding: 0;
    margin: 0;
}

.title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: small;
    flex-shrink: 0;
}

.size {
    font-size: small;
    color: var(--minor-text-color);
    flex-shrink: 0;
}

.icon {
    width: 3rem;
    height: 3rem;
}
</style>