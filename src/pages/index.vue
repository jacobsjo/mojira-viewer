<script setup lang="ts">
import { ref } from 'vue';
import InternalLink from '../components/InternalLink.vue';
import UsefulSearches from '../components/home/UsefulSearches.vue';
import SavedIssues from '../components/home/SavedIssues.vue';
import Go from '../components/home/Go.vue';
import SavedSearches from '../components/home/SavedSearches.vue';

const goTo = ref("");

</script>

<template>
    <div id="container">
        <div id="home">
            <h1>Unofficial Mojira Viewer</h1>
            <div class="boxes">
                <div class="combiner">
                    <div class="box input">
                        <Go />
                    </div>
                    <div class="box extend">
                        <h2>Saved Issues</h2>
                        <SavedIssues />
                    </div>
                </div>
                <div class="box">
                    <h2>Saved Searches</h2>
                    <SavedSearches />
                </div>
                <div class="box">
                    <h2>Useful Searches</h2>
                    <UsefulSearches />
                </div>
                <div class="box info">
                    <p>To report new Minecraft issues, go to <a
                            href="https://report.bugs.mojang.com/servicedesk">the official Servicedesk</a>.
                        Note that only <b>bugs</b> are accepted on the issue tracker, so please <b>don't report feature
                            requests or help requests</b>.</p>
                    <div class="links">
                        <InternalLink to="/about/">About</InternalLink>
                        <a target="_blank" href="https://github.com/jacobsjo/mojira-viewer">Source code</a>
                        <a target="_blank" href="https://github.com/jacobsjo/mojira-viewer/issues">Report a bug with this viewer</a>
                        <a target="_blank" href="https://jacobsjo.eu">My other tools</a>
                        <a target="_blank" href="https://ko-fi.com/jacobsjo">Buy me a coffee</a>
                    </div>
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
    max-width: 80rem;
    width: 100%;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
}

.boxes>* {
    width: 23rem;
    flex-grow: 1;
}

.combiner {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.extend {
    flex-grow: 1;
}

.box {
    box-sizing: border-box;
    padding: 0.7rem;
    background-color: var(--box-bg-color);
    box-shadow: 2px 2px 8px var(--box-shadow-color);
    border-radius: 4px;
}

.input {
    min-height: 0;
    height: fit-content;
}

.info {
    display: flex;
    flex-direction: column;
    gap: 1rem
}

.info p {
    margin: 0;
}

.info p:has(+ .links) {
    flex-grow: 1;
}

.links {
    display: flex;
    gap: 1rem;
    row-gap: 0.4rem;
    justify-content: center;
    white-space: nowrap;
    flex-wrap: wrap;
}

.links a {
    height: 1rem;
    max-height: 1rem;
    color: var(--minor-text-color);
}

.center {
    text-align: center;
}
</style>
