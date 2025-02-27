<script setup lang="ts">
import { computed } from 'vue';



const props = defineProps({
    emoji: String
})

const faIcon = computed(() => {
    switch (props.emoji){
        case ':info:':
            return 'circle-info'
        case ':note:':
            return 'note-sticky'
        case ':success:':
        case ':check_mark:':
            return 'circle-check'
        case ':warning:':
            return 'triangle-exclamation'
        case ':error:':
        case ':cross_mark:':
            return 'circle-xmark'
    }
    return undefined
})



</script>

<template>
    <font-awesome-icon class="emoji" :class="faIcon" v-if="faIcon" :icon="['fas', faIcon]" />
    <div class="emoji unicode" v-else>{{ props.emoji }}</div>

</template>

<style scoped>
    .emoji.circle-info {
        color: rgb(101, 101, 255);
    }

    .emoji.note-sticky {
        color: rgb(123, 38, 145);
    }

    .emoji.circle-check {
        color: green;
    }

    .emoji.triangle-exclamation {
        color: rgb(155, 132, 32)
    }

    .emoji.circle-xmark {
        color: red;
    }
</style>