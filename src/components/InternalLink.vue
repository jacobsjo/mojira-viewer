
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

    const props = defineProps({
        to: String
    })

    const route = useRoute()
    const jqlQuery = computed(() => {
        if (route.query.jql){
            return `?jql=${(route.query.jql as string).replaceAll(' ', '+')}`
        } else {
            return ''
        }
    })
</script>

<template>
    <RouterLink :to="`${props.to}${jqlQuery}`"><slot></slot></RouterLink>
</template>