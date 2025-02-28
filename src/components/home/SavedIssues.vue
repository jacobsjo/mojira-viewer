
<script setup lang="ts">
import { onUpdated } from 'vue';
import { useSavedIssuesStore } from '../../stores/SavedIssuesStore';
import IssueCard from '../IssueCard.vue';
import { useIssueCache } from '../../stores/IssueCache';
import { onMounted } from 'vue';

const issueCache = useIssueCache()
const savedIssues = useSavedIssuesStore()

onMounted(() => {
    savedIssues.savedIssues.forEach(key => issueCache.registerInterest(key))
    issueCache.update()
})

</script>

<template>
    <div class="issues">
        <div class="empty" v-if="savedIssues.savedIssues.size === 0">&mdash; Save issues by clicking the <font-awesome-icon :icon="['far', 'star']" /> icon &mdash;</div>
        <IssueCard v-for="issue of savedIssues.savedIssues" :issue_key="issue" />
    </div>
</template>

<style scoped>
.empty {
    text-align: center;
}
</style>