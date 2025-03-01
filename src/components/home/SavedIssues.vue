
<script setup lang="ts">
import { onUpdated } from 'vue';
import { useSavedIssuesStore } from '../../stores/SavedIssuesStore';
import IssueCard from '../IssueCard.vue';
import { useIssueCache } from '../../stores/IssueCache';
import { onMounted } from 'vue';
import { useSortable } from '@vueuse/integrations/useSortable'
import { useTemplateRef } from 'vue';

const issueCache = useIssueCache()
const savedIssues = useSavedIssuesStore()

onMounted(() => {
    savedIssues.savedIssues.forEach(key => issueCache.registerInterest(key))
    issueCache.update()
})

const list = useTemplateRef<HTMLElement>('list')

useSortable(list, savedIssues.savedIssues)

</script>

<template>
    <div class="issues" ref="list">
        <div class="empty" v-if="savedIssues.savedIssues.length === 0">&mdash; Save issues by clicking the <font-awesome-icon :icon="['far', 'star']" /> icon &mdash;</div>
        <IssueCard v-for="issue of savedIssues.savedIssues" :issue_key="issue" />
    </div>
</template>

<style scoped>
.empty {
    text-align: center;
}
</style>