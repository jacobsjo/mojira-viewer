<script setup lang="ts">
import { useRoute } from 'vue-router';
import { IssueFlair } from '../IssueFlair';
import Flair from './Flair.vue';
import { onBeforeMount } from 'vue';
import { computed } from 'vue';
import { useIssueCache } from '../stores/IssueCache';
import InternalLink from './InternalLink.vue';
import IssueSaveButton from './IssueSaveButton.vue';

const route = useRoute()
const issueCache = useIssueCache()

const props = defineProps({
    issue_key: String,
    description: String
})

onBeforeMount(() => {
    if (props.issue_key && !issueCache.cache.has(props.issue_key)){
        issueCache.registerInterest(props.issue_key)
    }
})

const issue = computed(() => {
    if (props.issue_key ) {
        return issueCache.cache.get(props.issue_key)
    }
    return undefined
})

const flair = computed(() => {
    if (issue.value !== undefined) {
        return IssueFlair.getIssueFlair(issue.value.issue.fields) 
    } else {
        return IssueFlair.IssueFlairs.Unknown
    }
})

</script>

<template>
    <InternalLink :to="`/browse/${props.issue_key}`" class="card result">
        <div class="title"><span class="id">{{ props.issue_key }}</span>
            <Flair :flair="flair" />
            <div class="gap" />
            <IssueSaveButton :issue_key="props.issue_key" />
        </div>
        <div class="summary">{{ issue?.issue.fields?.summary ?? props.description }}</div>
    </InternalLink>
</template>

<style scoped>
.result {
    padding: 0.5rem 0.5rem;
    color: unset;
    text-decoration: none;
    width: 100%;
    box-sizing: border-box;
    display: block;
}

.title {
    display: flex;
    gap: 0.5rem
}

.gap {
    flex-grow: 1;
}

.id {
    color: var(--key-color);
}

.result:hover .id {
    text-decoration: underline;
}

.summary {
    font-size: 14px;
}
</style>../stores/IssueCache