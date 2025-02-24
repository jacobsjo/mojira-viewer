<script setup lang="ts">
import { computed } from 'vue';

    const props = defineProps({
        node: Object,
    })

    const marks = computed(() => {
        var style = '';
        var href = undefined;
        var linkTitle = undefined;
        for (const mark of props.node?.marks ?? []){
            switch (mark.type){
                case 'textColor':
                    style+=`color:${mark.attrs.color};`
                    break;
                case 'backgroundColor':
                    style+=`background-color:${mark.attrs.color};`
                    break;
                case 'code':
                    style+='font-family: monospace, monospace;'
                    style+='border: 1px solid var(--code-border-color);'
                    style+='background-color: var(--code-bg-color);'
                    style+='padding: 0 0.3rem;'
                    break;
                case 'em':
                    style+='font-style: italic;'
                    break;
                case 'strike':
                    style+='text-decoration: line-through;'
                    break;
                case 'strong':
                    style+='font-weight: bold;'
                    break;
                case 'underline':
                    style+='text-decoration: underline;'
                    break;
                case 'subsup':
                    style+='font-size: small;'
                    style+=`vertical-align: ${mark.attrs.type === 'sup' ? 'super' : 'sub'};`
                    break;
                case 'link':
                    href = mark.attrs.href
                    linkTitle = mark.attrs.title
            }
        }
        return {style, href, linkTitle }
    })
</script>

<template>
    <a v-if="marks.href !== undefined" :style="marks.style" :href="marks.href" :title="marks.linkTitle"> {{ props.node?.text }}</a>
    <span v-else :style="marks.style"> {{ props.node?.text }}</span>
</template>

<style scoped>
</style>