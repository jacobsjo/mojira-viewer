<script setup lang="ts">
import { computed } from 'vue';
import { ref } from 'vue';
import Arrow from './icons/Arrow.vue';

const props = defineProps({
    title: String,
    values: Array
})

const expanded = ref(false)

const values = computed(() => {
    const vs = props.values ?? []
    if (expanded.value || vs.length <= 5) {
        return props.values
    } else {
        return [vs[0], '⋯', vs[vs.length - 3], vs[vs.length - 2], vs[vs.length - 1]]
    }
}
)
</script>

<template>
    <div class="detail">
        <span class="detailTitle">{{ $props.title }}:</span>
        <span v-if="$props.values" class="detailValue">
            <span v-for="value of values" class="value">{{ value }}</span>
            <button class="expandButton" :class="{active: expanded}"
                v-if="(props.values?.length ?? 0) > 5"
                @click="expanded = !expanded"
                :title="expanded ? 'Contract' : 'Expand'"><Arrow /></button>
        </span>
    </div>
</template>


<style scoped>
.detail {
    display: flex;
    gap: 1rem;
    row-gap: 0;
}

.detailTitle {
    font-weight: bolder;
    white-space: nowrap;
    color: var(--accent2-color);
}

.detailValue {
    white-space: nowrap;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    row-gap: 0;
}

.expandButton {
    border: none;
    background-color: transparent;
    transform: rotate(-90deg);
    transition: transform 0.3s;
}

.expandButton svg {
    fill: var(--accent-color);
}

.expandButton.active {
    transform: rotate(90deg);
}
</style>