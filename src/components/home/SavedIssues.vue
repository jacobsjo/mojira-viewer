
<script setup lang="ts">
import { onUpdated } from 'vue';
import { useSaveStore } from '../../stores/SaveStore';
import IssueCard from '../IssueCard.vue';
import { useIssueCache } from '../../stores/IssueCache';
import { onMounted } from 'vue';
import { useSortable } from '@vueuse/integrations/useSortable'
import { useTemplateRef } from 'vue';

const issueCache = useIssueCache()
const saveStore = useSaveStore()

onMounted(() => {
    saveStore.savedIssues.forEach(key => issueCache.registerInterest(key))
    issueCache.update()
})

const list = useTemplateRef<HTMLElement>('list')

useSortable(list, saveStore.savedIssues)

</script>

<template>
    <div class="issues" ref="list">
        <div class="empty" v-if="saveStore.savedIssues.length === 0">&mdash; Save issues by clicking the <font-awesome-icon :icon="['far', 'star']" /> icon &mdash;</div>
        <IssueCard v-for="issue of saveStore.savedIssues" :issue_key="issue" />
    </div>
</template>

<style scoped>
.empty {
    text-align: center;
}
</style>../../stores/SaveStore