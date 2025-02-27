<script setup lang="ts">
import { useRoute } from 'vue-router';
import { IssueFlair } from '../IssueFlair';
import Flair from './Flair.vue';
import { onBeforeMount } from 'vue';
import { computed } from 'vue';
import { useIssueCache } from '../stores/IssueCache';
import InternalLink from './InternalLink.vue';

const route = useRoute()
const issueCache = useIssueCache()

const props = defineProps({
    issue: Object,
})

onBeforeMount(() => {
    if (props.issue && props.issue.fields.customfield_10049 === undefined){
        issueCache.registerInterest(props.issue.key)
    }
})

const flair = computed(() => {
    if (props.issue?.fields.customfield_10049 !== undefined){
        return IssueFlair.getIssueFlair(props.issue?.fields) 
    } else if (issueCache.cache.has(props.issue?.key)) {
        return IssueFlair.getIssueFlair(issueCache.cache.get(props.issue?.key)?.issue.fields) 
    } else {
        return IssueFlair.IssueFlairs.Unknown
    }
})

</script>

<template>
    <InternalLink :to="`/browse/${props.issue?.key}`" class="card result">
        <div class="title"><span class="id">{{ props.issue?.key }}</span>
            <Flair :flair="flair" />
        </div>
        <div class="summary">{{ props.issue?.fields?.summary }}</div>
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