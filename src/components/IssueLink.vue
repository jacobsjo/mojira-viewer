<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useIssueInfillStore } from '../stores/IssueInfillStore';
import Flair from './Flair.vue';
import { IssueFlair } from '../IssueFlair';
import { computed } from 'vue';

const issueInfillStore = useIssueInfillStore()

const props = defineProps({
    issueKey: String,
})

onBeforeMount(() => {
    if (props.issueKey) issueInfillStore.registerInfillInterest(props.issueKey)
})

const issue = computed(() => issueInfillStore.infill.get(props.issueKey ?? ''))

</script>

<template>
    <RouterLink class='issueLink' :to="`/browse/${props.issueKey}`"><span class="key">{{ props.issueKey }}</span><Flair v-if="issue !== undefined" :flair="IssueFlair.getIssueFlair((issue as any).fields)" /></RouterLink>
    
</template>

<style scoped>
    .issueLink{
        text-decoration: none;
        display: inline-flex;
        gap: 0.2rem;
    }

    .issueLink:hover .key{
        text-decoration: underline;
    }

</style>