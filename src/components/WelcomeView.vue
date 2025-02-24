<script setup lang="ts">
import InternalLink from './InternalLink.vue';


</script>

<template>
    <div id="container">
        <div id="welcome">
            <h1>Unofficial Mojira Viewer</h1>
            <p>This main-page is still WIP. It will eventually include:</p>
            <ul>
                <li>list of recent searches</li>
                <li>list of saved searched</li>
                <li>list of usefull searched</li>
                <li>list of favorited issues</li>
            </ul>
            <p>For now, you can search for issues using the search bar above. You might want to restrict the search to a specific <b>poject</b>, such as Java Edition.</p>
            <p>To report new issues, go to <a href="https://report.bugs.mojang.com/servicedesk">https://report.bugs.mojang.com/servicedesk</a>.
               Note that only <b>bugs</b> are accepted on the issue tracker, so please <b>don't report feature requests or help requests</b>.</p>

            <InternalLink to="/about/">About</InternalLink>
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

    #welcome {
        max-width: 40rem;
        padding: 2rem;
    }

    h1 {
        margin: 0;
        text-align: center;
    }
</style>
