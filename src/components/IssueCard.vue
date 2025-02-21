<script setup lang="ts">
import { useRoute } from 'vue-router';
import { IssueFlair } from '../IssueFlair';
import Flair from './Flair.vue';
import { onBeforeMount } from 'vue';
import { useIssueInfillStore } from '../stores/IssueInfillStore';
import { computed } from 'vue';

const route = useRoute()
const issueInfillStore = useIssueInfillStore()

const props = defineProps({
    issue: Object,
})

onBeforeMount(() => {
    if (props.issue && props.issue.fields.customfield_10049 === undefined){
        issueInfillStore.registerInfillInterest(props.issue.key)
    }
})

const flair = computed(() => {
    if (props.issue?.fields.customfield_10049 !== undefined){
        return IssueFlair.getIssueFlair(props.issue?.fields) 
    } else if (issueInfillStore.infill.has(props.issue?.key)) {
        return IssueFlair.getIssueFlair(issueInfillStore.infill.get(props.issue?.key).fields) 
    } else {
        return IssueFlair.IssueFlairs.Unknown
    }
})

</script>

<template>
    <RouterLink :to="`/browse/${props.issue?.key}`" class="card result"
        :class="{ open: route.params.issue === props.issue?.key }">
        <div class="title"><span class="id">{{ props.issue?.key }}</span>
            <Flair :flair="flair" />
        </div>
        <div class="summary">{{ props.issue?.fields?.summary }}</div>
    </RouterLink>
</template>

<style scoped>
.result {
    padding: 0.5rem 0.5rem;
    color: black;
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
    color: blue;
}

.result:hover .id {
    text-decoration: underline;
}

.summary {
    font-size: 14px;
}
</style>