

<template>
    <font-awesome-icon class="spinner" :icon="['fas', 'spinner']" />
</template>

<style scoped>
@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner {
    animation: rotating 2s linear infinite;
}

</style>