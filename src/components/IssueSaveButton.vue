
<script setup lang="ts">
import { computed } from 'vue';
import { useSavedIssuesStore } from '../stores/SavedIssuesStore';

const savedIssues = useSavedIssuesStore()

const props = defineProps({
    issue_key: String
})

const isSaved = computed(() => props.issue_key && savedIssues.savedIssues.has(props.issue_key))

function toggle() {
    if (props.issue_key === undefined) return
    if (savedIssues.savedIssues.has(props.issue_key)){
        savedIssues.savedIssues.delete(props.issue_key)
    } else {
        savedIssues.savedIssues.add(props.issue_key)
    }
}
</script>

<template>
    <font-awesome-icon class="star" v-if="props.issue_key" @click.stop.prevent="toggle" :icon="[isSaved ? 'fas' : 'far', 'star']" :title="isSaved ? 'Unsave issue' : 'Save issue'" />
</template>

<style scoped>
.star {
    color: var(--text-color);
    cursor: pointer;
}
</style>