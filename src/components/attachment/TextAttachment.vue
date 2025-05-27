<script setup lang="ts">
const props = defineProps({
    id: String,
    active: Boolean
})

const content = await fetch(`https://bugs.mojang.com/api/issue-attachment-get?attachmentId=${props.id}`).then(value => value.text())

function clickText(evt: MouseEvent){
    if (props.active){
        evt.stopPropagation()
    }
}
</script>

<template>
    <pre :class="{active: active}" @click="clickText"><code>{{ content }}</code></pre>
</template>

<style scoped>
pre {
    width: 100%;
    box-sizing: border-box;
    padding: 0.8rem 0.4rem;
    background-color: var(--code-bg-color);
    border: 1px solid var(--code-border-color);
    color: var(--text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    height: 100%;
}

pre.active {
    overflow: scroll;
    max-height: 40rem;
    user-select: text;
    -webkit-user-drag: none;
    user-drag: none;
}
</style>