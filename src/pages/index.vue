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
                <div class="box">
                    <p>This main-page is still WIP. It will eventually include:</p>
                    <ul>
                        <li>list of saved searched</li>
                        <li>list of favorited issues</li>
                    </ul>
                    <p>For now, you can search for issues using the search bar above. You might want to restrict the search to a specific <b>project</b>, such as Java Edition.</p>
                </div>
                <div class="box">
                    <input class="search-input" placeholder="Enter issue ID or URL" v-model="goTo"><InternalLink class="search" :to="`/browse/${goTo}`">Go</InternalLink>
                </div>
                <div class="box">
                    <UsefullSearches />
                </div>
                <div class="box">
                    <p>To report new issues, go to <a href="https://report.bugs.mojang.com/servicedesk">https://report.bugs.mojang.com/servicedesk</a>.
                    Note that only <b>bugs</b> are accepted on the issue tracker, so please <b>don't report feature requests or help requests</b>.</p>
                </div>
                <div class="box">
                    <InternalLink to="/about/">About</InternalLink>
                </div>
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
        max-width: 50rem;
        padding: 2rem;
    }

    h1 {
        margin: 0;
        text-align: center;
        margin-bottom: 2rem;
    }

    .boxes {
        display: grid;
        grid-template-columns: 20rem 20rem;
        gap: 1rem;
    }

    .box {
        width: 100%;
        box-sizing: border-box;
        padding: 1rem;
        border: 1px solid var(--main-border-color);
        border-radius: 1rem;

    }

</style>
