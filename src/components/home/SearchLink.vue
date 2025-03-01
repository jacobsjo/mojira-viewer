
<script setup lang="ts">
import router from '../../router'
import { useIsMobile } from '../../Mobile';
import { computed } from 'vue';

const isMobile = useIsMobile()

const props = defineProps({
    project: Array,
    jql: String
})

const query = computed(() => {
    if (props.project === undefined || props.project.length === 0){
        return props.jql ?? ''
    }
    const projectQuery = `project IN (${props.project})`

    if (props.jql?.startsWith('ORDER BY')){
        return `${projectQuery} ${props.jql}`
    }
    return `${projectQuery} AND ${props.jql}`
})

async function search() {
    router.push({
        name: isMobile.value ? '/browse' : undefined,
        query: {
            jql: query.value
        }
    })
}

</script>

<template>
    <button class="search-link" @click="search"><slot></slot></button>    
</template>

<style scoped>
    .search-link {
        background-color: var(--button-color);
        border: none;
        padding: 0.6rem;
        color: var(--text-color);
        box-shadow: 2px 2px 3px var(--box-shadow-color);
        cursor: pointer;
    }

    .search-link:is(:hover,:focus) {
        background-color: var(--button-hover-color);
    }
</style>