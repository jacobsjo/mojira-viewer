<script setup lang="ts">
    import AdfNodeList from './AdfNodeList.vue'
    import AdfInlineNodeList from './AdfInlineNodeList.vue'
    import AdfInlineNode from './AdfInlineNode.vue'
    import AdfListItemNodes from './AdfListItemNodes.vue'
    import AdfTableRows from './AdfTableRows.vue'

    const props = defineProps({
        node: Object,
    })
</script>

<template>
    <blockquote v-if="props.node?.type === 'blockquote'"><AdfNodeList :nodes="props.node?.content" /></blockquote>
    <ul v-else-if="props.node?.type === 'bulletList'"><AdfListItemNodes :nodes="props.node?.content" /></ul>
    <ol v-else-if="props.node?.type === 'orderedList'"><AdfListItemNodes :nodes="props.node?.content" /></ol>
    <pre v-else-if="props.node?.type === 'codeBlock'"><code><AdfNodeList :nodes="props.node?.content" /></code></pre>
    <time v-else-if="props.node?.type === 'date'" :datetime="new Date(props.node.attrs.timestamp).toISOString()">{{ new Date(props.node?.attrs.timestamp).toLocaleString() }}</time>
    <div class="expand" v-else-if="props.node?.type === 'expand' || props.node?.type === 'nestedExpand'"><p>{{ props.node.attrs.title }}</p><AdfNodeList :nodes="props.node.content" /></div> <!-- TODO: separate component-->
    <h1 v-else-if="props.node?.type === 'heading' && props.node?.attrs.level === 1"><AdfInlineNodeList :nodes="props.node?.content" /></h1>
    <h2 v-else-if="props.node?.type === 'heading' && props.node?.attrs.level === 2"><AdfInlineNodeList :nodes="props.node?.content" /></h2>
    <h3 v-else-if="props.node?.type === 'heading' && props.node?.attrs.level === 3"><AdfInlineNodeList :nodes="props.node?.content" /></h3>
    <h4 v-else-if="props.node?.type === 'heading' && props.node?.attrs.level === 4"><AdfInlineNodeList :nodes="props.node?.content" /></h4>
    <h5 v-else-if="props.node?.type === 'heading' && props.node?.attrs.level === 5"><AdfInlineNodeList :nodes="props.node?.content" /></h5>
    <h6 v-else-if="props.node?.type === 'heading' && props.node?.attrs.level === 6"><AdfInlineNodeList :nodes="props.node?.content" /></h6>
    <div class="media" v-else-if="props.node?.type === 'mediaGroup'">[{{ props.node?.content.length }} media element{{ props.node?.content.length !== 1 ? "s" : "" }}]</div>
    <div class="media" v-else-if="props.node?.type === 'mediaSingle'">[1 media element]</div>
    <div class="panel" v-else-if="props.node?.type === 'panel'" :class="props.node?.attrs.panelType"><AdfNodeList :nodes="props.node?.content" /></div>
    <p v-else-if="props.node?.type === 'paragraph'"><AdfInlineNodeList :nodes="props.node?.content" /></p>
    <hr v-else-if="props.node?.type === 'rule'" />
    <table v-else-if="props.node?.type === 'table'"><AdfTableRows :nodes="props.node?.content" /></table>
    <!-- inline nodes -->
    <AdfInlineNode v-else :node="node" />

</template>

<style scoped>
    .media {
        width: 10rem;
        height: 3rem;
        border: 1px solid black;
    }

    pre {
        width: 100%;
        box-sizing: border-box;
        overflow-x: scroll;
        padding: 0.8rem 0.4rem;
        background-color: #eeeeee;
    }

</style>