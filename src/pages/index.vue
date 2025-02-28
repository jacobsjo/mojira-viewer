<script setup lang="ts">
import { ref } from 'vue';
import InternalLink from '../components/InternalLink.vue';
import UsefullSearches from '../components/home/UsefullSearches.vue';

const goTo = ref("");

</script>

<template>
    <div id="container">
        <div id="home">
            <h1>Unofficial Mojira Viewer</h1>
            <div class="boxes">
                <div class="combiner long">
                    <div class="box input">
                        <input class="search-input" placeholder="Enter issue ID or URL" v-model="goTo"><InternalLink class="search" :to="`/browse/${goTo}`">Go</InternalLink>
                    </div>
                    <div class="box">
                        <h2>Usefull Searches</h2>
                        <UsefullSearches />
                    </div>
                </div>
                <div class="box long">
                    <h2>Saved Issues</h2>
                </div>
                <div class="box long">
                    <h2>Saved Searches</h2>
                </div>
                <div class="box">
                    <p>To search for issues, use the search bar above. You might want to restrict the search to a specific <b>project</b>, such as <b>Java</b> Edition.</p>
                    <p>To report new issues, go to <a href="https://report.bugs.mojang.com/servicedesk">https://report.bugs.mojang.com/servicedesk</a>.
                    Note that only <b>bugs</b> are accepted on the issue tracker, so please <b>don't report feature requests or help requests</b>.</p>
                    <InternalLink to="/about/">About</InternalLink>
                </div>
            </div>
            <div>
            </div>

        </div>
    </div>
</template>

<style scoped>
    #container {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        overflow-y: scroll;
        box-sizing: border-box;
        text-align: left;
    }

    #home {
        width: 100%;
        padding: 1rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h1 {
        margin: 0;
        text-align: center;
        margin-bottom: 2rem;
    }

    h2 {
        margin: 0;
        margin-bottom: 1rem;
        font-size: 14pt;
    }

    .boxes {
        display: flex;
        max-width: 70rem;
        width: 100%;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .boxes >* {
        width: 17rem;
        flex-grow: 1;
    }

    .combiner {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .box {
        box-sizing: border-box;
        padding: 0.7rem;
        background-color: var(--box-bg-color);
    }

    .input {
        min-height: 0;
        height: fit-content;
    }

    .wide {
        grid-column: span 2;
    }

    .long {
        grid-row: span 2;
    }

</style>
