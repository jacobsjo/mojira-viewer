<script setup lang="ts">
    import { IssueFlair } from "../IssueFlair"

    const props = defineProps({
        flair: IssueFlair,
    })
</script>

<template>
    <span class="flair" :class="flair?.clss">
        {{ flair?.description }}
    </span>
 </template>


<style scoped>
    .flair {
        padding: 0 0.5rem;
        border-radius: 1rem;
        width: fit-content;
        text-align: bottom;
        box-sizing: border-box;
    }

    .new {
        border: 1px solid black;
    }

    .confirmed {
        background-color: rgb(0, 0, 128);
        color: white;
    }

    .mojang-confirmed.low {
        background-color: darkgreen;
        color: white;
    }

    .mojang-confirmed.normal {
        background-color: rgb(151, 151, 0);
        color: white;
    }

    .mojang-confirmed.important {
        background-color: rgb(158, 103, 0);
        color: white;
    }

    .mojang-confirmed.veryImportant {
        background-color: rgb(155, 0, 0);
        color: white;
    }

    .fixed {
        border: 1px solid darkgreen;
        background-color: rgb(225, 255, 222);
        color: darkgreen;
    }

    .invalid {
        border: 1px solid rgb(68, 68, 68);
        background-color: rgb(163, 163, 163);
        color:rgb(68, 68, 68)
    }

</style>