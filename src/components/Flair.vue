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
    white-space: nowrap;
}

.new {
    border: 1px solid black;
    color: black;
}

.confirmed {
    background-color: rgb(0, 0, 128);
    color: white;
}

.mojang-low {
    background-color: darkgreen;
    color: white;
}

.mojang-normal {
    background-color: rgb(151, 151, 0);
    color: white;
}

.mojang-important {
    background-color: rgb(158, 103, 0);
    color: white;
}

.mojang-very-important {
    background-color: rgb(155, 0, 0);
    color: white;
}

.in-progress {
    background-color: rgb(133, 6, 172);
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
    color: rgb(43, 43, 43)
}


.dark .new {
    border: 1px solid rgb(187, 187, 187);
    color: rgb(187, 187, 187);
}

.dark .confirmed {
    background-color: rgb(135, 135, 211);
    color: black;
}

.dark .mojang-low {
    background-color: rgb(89, 189, 89);
    color: black;
}

.dark .mojang-normal {
    background-color: rgb(228, 228, 93);
    color: black;
}

.dark .mojang-important {
    background-color: rgb(226, 159, 36);
    color: black;
}

.dark .mojang-very-important {
    background-color: rgb(214, 46, 46);
    color: black;
}

.dark .in-progress {
    background-color: rgb(186, 84, 218);
    color: black;
}

.dark .fixed {
    border: 1px solid rgb(126, 196, 126);;
    background-color: rgb(15, 61, 11);
    color: rgb(126, 196, 126);
}

.dark .invalid {
    border: 1px solid rgb(68, 68, 68);
    background-color: rgb(65, 65, 65);
    color: rgb(211, 211, 211)
}
</style>