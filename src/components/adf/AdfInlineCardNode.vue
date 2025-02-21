<script setup lang="ts">
    import { computed } from 'vue';
    import IssueLink from '../IssueLink.vue'

    const props = defineProps({
        url: String,
    })

    const key = computed(() => props.url?.match(/https:\/\/mojira.atlassian.net\/browse\/([^#]*)/)?.[1])
</script>

<template>
    <IssueLink v-if="key !== undefined" :issueKey="key" />
    <a v-else :href="props.url">{{props.url}}</a>
</template>

<style scoped>

</style>