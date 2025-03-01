<script setup lang="ts">
import { ref } from 'vue';
import router from '../../router'

const goTo = ref("")

function go(){
    const key = goTo.value.match(/(?:MC|MCPE|REALMS|BDS|MCL|WEB)-[0-9]+/)?.[0]
    if (key){
        router.push({name: '/browse.[key]', params: {key}})
    }
}
</script>

<template>
    <div class="go">
        <input class="search-input" placeholder="Enter issue ID or URL" v-model="goTo">
        <button class="search" @click="go">Go</button>
    </div>
</template>

<style scoped>

.go {
    display: flex;
    gap: 0.5rem;
}

.go input {
    flex-grow: 1;
}

.search {
    height: 1.7rem;
    padding: 0 1rem;
    cursor: pointer;
}
</style>