<script setup lang="ts">
  import SearchBar from "./components/search/SearchBar.vue"
  import SearchResults from "./components/SearchResults.vue"
</script>

<template>
  <SearchBar/>
  <div id="main">
    <SearchResults/>
    <router-view class="view"/>
  </div>
</template>

<style>
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100%;

  --vs-font-size: 10pt;
  --vs-line-height: 12pt;
}

#main {
  flex-grow: 1;
  height: 0;
  display: flex;
}

html,body{
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

.view {
  flex-grow: 1;
  width: 0;
  padding: 1rem
}


.card{
    user-select: none;
    cursor: pointer;
    transition: background-color 0.2s;
}

.card.open {
  background-color: rgb(177, 199, 209);
}

.card:hover {
  background-color: rgb(204, 204, 204);
}

.card.open:hover {
  background-color: rgb(156, 176, 185);;
}

.v-select .vs__selected-options {
    flex-wrap: nowrap;
    overflow-x: hidden;
}

.v-select .vs__selected {
    white-space: nowrap;
}

.v-select .vs__search {
    min-width: 2rem;
}


</style>
