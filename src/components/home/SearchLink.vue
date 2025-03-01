
<script setup lang="ts">
import router from '../../router'
import { useIsMobile } from '../../Mobile';
import { computed } from 'vue';
import { useSearchResultStore } from '../../stores/SearchResultStore';
import SaveSearchButton from '../search/SaveSearchButton.vue';

const isMobile = useIsMobile()
const searchResultsStore = useSearchResultStore()

const props = defineProps({
    project: Array,
    jql: String,
    isDefault: Boolean
})

const query = computed(() => {
    if (props.project === undefined || props.project.length === 0){
        return props.jql ?? ''
    }
    const projectQuery = props.project.length === 1 ? `project = ${props.project[0]}` : `project IN (${props.project})`

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
    searchResultsStore.search(query.value)
}

</script>

<template>
    <div class="search-link card" tabindex=0 @click="search" @keypress.enter="search">
        <div class="title">
            <div class="name">
                <slot></slot>
            </div>
            <SaveSearchButton v-if="!props.isDefault" :jql="props.jql" />            
        </div>    
        <div class="jql">
            {{ query }}
        </div>
    </div>
</template>

<style scoped>
.search-link {
    display: flex;
    flex-direction: column;
    padding: 0.3rem 0.5rem;
}

.title {
    display: flex;
}

.name {
    color: var(--key-color);
    flex-grow: 1;
}

.jql {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--text-color);
    font-size: 9pt;
}

</style>