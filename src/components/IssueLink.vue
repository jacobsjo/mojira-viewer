<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useIssueCache } from '../stores/IssueCache';
import Flair from './Flair.vue';
import { IssueFlair } from '../IssueFlair';
import { computed } from 'vue';
import InternalLink from './InternalLink.vue';

const issueCache = useIssueCache()

const props = defineProps({
    issueKey: String,
})

onBeforeMount(() => {
    if (props.issueKey) issueCache.registerInterest(props.issueKey)
})

const issue = computed(() => issueCache.cache.get(props.issueKey ?? '')?.issue)

</script>

<template>
    <InternalLink class='issueLink' :to="`/browse/${props.issueKey}`"><span class="key">{{ props.issueKey }}</span><Flair v-if="issue !== undefined" :flair="IssueFlair.getIssueFlair((issue as any).fields)" /></InternalLink>
    
</template>

<style scoped>
    .issueLink{
        text-decoration: none;
        display: inline-flex;
        gap: 0.2rem;
    }

    .issueLink .key{
        color: var(--key-color);
    }

    .issueLink:hover .key{
        text-decoration: underline;
    }

</style>../stores/IssueCache