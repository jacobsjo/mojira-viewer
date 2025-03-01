
<script setup lang="ts">
import { computed } from 'vue';
import { useSaveStore } from '../stores/SaveStore';

const saveStore = useSaveStore()

const props = defineProps({
    issue_key: String
})

const isSaved = computed(() => props.issue_key && saveStore.savedIssues.includes(props.issue_key))

function toggle() {
    if (props.issue_key === undefined) return
    const index = saveStore.savedIssues.indexOf(props.issue_key)
    if (index !== -1){
        saveStore.savedIssues.splice(index, 1)
    } else {
        saveStore.savedIssues.push(props.issue_key)
    }
}
</script>

<template>
    <font-awesome-icon class="star" v-if="props.issue_key" @click.stop.prevent="toggle" @keypress.enter.stop.prevent="toggle" :icon="[isSaved ? 'fas' : 'far', 'star']" :title="isSaved ? 'Unsave issue' : 'Save issue'"/>
</template>

<style scoped>
.star {
    color: var(--text-color);
    cursor: pointer;
}
</style>../stores/SaveStore