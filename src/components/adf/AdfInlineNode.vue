<script setup lang="ts">
    import AdfTextNode from './AdfTextNode.vue'
    import AdfInlineCardNode from './AdfInlineCardNode.vue'
import Emoji from './Emoji.vue';

    const props = defineProps({
        node: Object,
    })

    function constructStyle(marks: any[]){
        var style = '';
        for (const mark of marks){
            switch (mark.type){
                case 'textColor':
                    style+=`color:${mark.attrs.color};`
                    break;
                case 'backgroundColor':
                    style+=`background-color:${mark.attrs.color};`
                    break;
                case 'code':
                    style+='font-family: monospace, monospace;'
                    break;
                case 'em':
                    style+='font-style: italic;'
                    break;
                case 'strike':
                    style+='text-decoration: line-through;'
                    break;
                case 'strong':
                    style+='font-weight: strong;'
                    break;
                case 'underline':
                    style+='text-decoration: underline;'
                    break;
                case 'subsup':
                    style+='font-size: small;'
                    style+=`vertical-align: ${mark.attrs.type === 'sup' ? 'super' : 'sub'};`
                    break;
            }
        }
    }
</script>

<template>
    <Emoji v-if="props.node?.type === 'emoji'" :emoji="props.node?.attrs.text"/>
    <br v-else-if="props.node?.type === 'hardBreak'" />
    <AdfInlineCardNode v-else-if="props.node?.type === 'inlineCard'" :url="props.node?.attrs.url" />
    <span class="mention" v-else-if="props.node?.type === 'mention'">{{props.node?.attrs.text}}</span>
    <span class="status" v-else-if="props.node?.type === 'status'" :class="props.node?.attrs.color">{{ props.node?.attrs.text }}</span>
    <AdfTextNode v-else-if="props.node?.type === 'text'" :node="node" />
    <span v-else class="error">[Unkown Text-Node {{ props.node?.type }}]</span>
</template>

<style scoped>
</style>