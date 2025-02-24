<script setup lang="ts">
import SearchBar from "./components/search/SearchBar.vue"
import SearchResults from "./components/SearchResults.vue"
import { useSettingsStore } from "./stores/SettingsStore";

const settingsStore = useSettingsStore()
</script>

<template>
  <div class="app" :class="{ dark: settingsStore.darkMode }">
    <SearchBar />
    <div id="main">
      <SearchResults />
      <router-view class="view" />
    </div>
  </div>
</template>

<style>
.app {
  --searchbar-bg-color: rgb(255, 242, 230);
  --main-border-color: rgb(153, 153, 153);
  --results-bg-color: rgb(224, 232, 233);
  --main-bg-color: rgb(255, 255, 255);
  --input-bg-color: white;
  --input-text-color: black;
  --link-color: rgb(0, 26, 255);
  --card-hover-color: rgb(204, 204, 204);
  --card-active-color: rgb(177, 199, 209);
  --card-active-hover-color: rgb(156, 176, 185);
  --key-color: blue;
  --accent-color: rgb(26, 34, 104);
  --accent2-color: rgb(146, 0, 0);
  --scrollbar-bg-color: gray;
  --scrollbar-thumb-color: lightgray;
  --scrollbar-thumb-active-color: var(--accent-color);
  --code-bg-color: #eeeeee;
  --code-border-color: gray;
  --text-color: black;

  --vs-controls-color: var(--accent-color) !important;

  color: var(--text-color);
}

.app.dark {
  --searchbar-bg-color: rgb(19, 19, 19);
  --main-border-color: rgb(86, 104, 163);
  --results-bg-color: rgb(39, 39, 39);
  --main-bg-color: rgb(34, 34, 34);
  --input-bg-color: black;
  --input-text-color: white;
  --accent-color: rgb(78, 99, 131);
  --link-color: rgb(178, 219, 255);
  --card-hover-color: rgb(70, 70, 70);
  --card-active-color: rgb(72, 82, 87);
  --card-active-hover-color: rgb(100, 115, 122);
  --key-color: rgb(174, 174, 255);
  --accent2-color: rgb(255, 213, 174);
  --scrollbar-bg-color: black;
  --scrollbar-thumb-color: rgb(83, 83, 83);
  --code-bg-color: #363636;
  --code-border-color: rgb(122, 122, 122);
  --text-color: rgb(230, 230, 230);

  --vs-colors--lightest: white !important;
  --vs-border-color: var(--accent-color) !important;
  --vs-controls-color: var(--accent-color) !important;
  --vs-selected-color: rgb(199, 199, 199) !important;
  --vs-selected-bg: black !important;
  --vs-dropdown-bg: black !important;
}

#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;

  --vs-font-size: 10pt;
  --vs-line-height: 12pt;
}

.app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#main {
  flex-grow: 1;
  height: 0;
  display: flex;
}

a {
  color: var(--link-color);
}


html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

.view {
  flex-grow: 1;
  width: 0;
  padding: 1rem;
  background-color: var(--main-bg-color);
}

.search-input {
  height: 1.52rem;
  border: 1px solid var(--vs-border-color);
  border-radius: 0.3rem;
  background-color: var(--input-bg-color);
  color: var(--input-text-color)
}

.v-select>div {
  background-color: var(--input-bg-color);
}

.card {
  user-select: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.card.open {
  background-color: var(--card-active-color);
}

.card:hover {
  background-color: var(--card-hover-color);
}

.card.open:hover {
  background-color: var(--card-active-hover-color);
  ;
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


::-webkit-scrollbar {
  height: 10px;
  width: 5px;
  background: var(--scrollbar-bg-color);
}

::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb-color);
  -webkit-border-radius: 1ex;
  -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
}

:hover::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb-active-color);
}

::-webkit-scrollbar-corner {
  background: #000;
}
</style>
