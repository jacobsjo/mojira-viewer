<script lang="ts">
import { defineBasicLoader } from 'unplugin-vue-router/data-loaders/basic'
import { getComments } from '../api'
import { IssueFlair } from '../IssueFlair'
import Flair from './Flair.vue'
import DetailEntry from './DetailEntry.vue'
import { computed } from 'vue'
import AdfDoc from './adf/AdfDoc.vue'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import IssueCard from './IssueCard.vue'
import { onUpdated } from 'vue'
import { useIssueCache } from '../stores/IssueCache'

// TODO sanitise route.params.issue


export const useIssueData = defineBasicLoader('getIssue', async (route) => {
    const issueCache = useIssueCache()

    return issueCache.getIssue(route.params.issue as string)
})

export const useComments = defineBasicLoader('getComments', async (route) => {
    return await getComments(route.params.issue as string)
})

function mapVersionList(versions: any[]) {
    return versions.map(version => version.name.replaceAll('Minecraft ', '').replaceAll('Snapshot ', ''))
}

</script>

<script setup lang="ts">
const route = useRoute()
const issueCache = useIssueCache()

const {
    data: issue,
    isLoading: isLoadingIssue,
    error: errorIssue,
    reload: reloadIssue,
} = useIssueData()

const {
    data: comments,
    isLoading: isLoadingComments,
    error: errorComments,
    reload: reloadComments,
} = useComments()

const issueFlair = computed(() => IssueFlair.getIssueFlair(issue.value.fields))

const issueLinks = computed(() => {
    const linkTypes = new Map<Number, { type: any, inward: any[], outward: any[] }>()
    if (issue.value.fields.issuelinks !== undefined) {
        for (const link of issue.value.fields.issuelinks) {
            if (!linkTypes.has(link.type.id)) {
                linkTypes.set(link.type.id, { type: link.type, inward: [], outward: [] })
            }

            const type = linkTypes.get(link.type.id)!
            if (link.inwardIssue !== undefined) {
                type.inward.push(link.inwardIssue)
            } else if (link.outwardIssue !== undefined) {
                if (type.type.inward === type.type.outward){ // symetric links
                    type.inward.push(link.outwardIssue)
                } else {
                    type.outward.push(link.outwardIssue)
                }
            }
        }
    }
    return linkTypes
})

watch(
    () => route.params.issue,
    (issue) => {
        reloadIssue()
        reloadComments()
    }
)

onUpdated(() => {
    issueCache.update()
})

</script>

<template>
    <div id="container">
        <div v-if="isLoadingIssue" id="loading">
            Loading
        </div>
        <div v-else-if="errorIssue" id="error">
            Issue not found
        </div>
        <div v-else id="issue">
            <h1>{{ issue.fields.summary }}</h1>

            <Flair :flair="issueFlair" />

            <DetailEntry title="Status" :value="issue.fields.status.name" />
            <DetailEntry title="Resolution" :value="issue.fields.resolution?.name ?? 'None'" />
            <DetailEntry title="Confirmation Status" :value="issue.fields.customfield_10054?.value" />
            <DetailEntry title="Mojang Priority" :value="issue.fields.customfield_10049?.value" />
            <DetailEntry title="Affects Version(s)" :values="mapVersionList(issue.fields.versions)" />
            <DetailEntry title="Fix Version(s)" :values="mapVersionList(issue.fields.fixVersions)" />
            <DetailEntry title="Labels" :values="issue.fields.labels" />
            <DetailEntry title="Category"
                :values="issue.fields.customfield_10055?.map((category: any) => category.value) ?? []" />
            <DetailEntry title="Area" :value="issue.fields.customfield_10051?.value" />
            <DetailEntry title="Created" :value="new Date(issue.fields.created).toLocaleString()" />
            <DetailEntry title="Updated" :value="new Date(issue.fields.updated).toLocaleString()" />
            <DetailEntry title="Resolved" :value="issue.fields.resolutiondate ? new Date(issue.fields.resolutiondate).toLocaleString() : ''" />
            <DetailEntry title="Votes" :value="issue.fields.votes.votes.toString()" />
            <DetailEntry title="Watchers" :value="issue.fields.watches.watchCount.toString()" />
            <DetailEntry title="ADO" :value="issue.fields.customfield_10050" />

            <h3>Description:</h3>
            <AdfDoc :node="issue.fields.description" />

            <h3 v-if="issueLinks.size > 0">Issue Links:</h3>
            <div class="links">
                <div class="linkType" v-for="linkType of issueLinks.values()">
                    <div class="inward" v-if="linkType.inward.length > 0">
                        <h4>{{ linkType.type.inward }}</h4>
                        <IssueCard v-for="linked of linkType.inward" :issue="linked" />
                    </div>
                    <div class="outward" v-if="linkType.outward.length > 0">
                        <h4>{{ linkType.type.outward }}</h4>
                        <IssueCard v-for="linked of linkType.outward" :issue="linked" />
                    </div>
                </div>
            </div>

            <h3>Comments:</h3>
            <div class="comments">
                <div v-if="isLoadingComments">Loading</div>
                <div v-else-if="comments.length === 0">No comments</div>
                <div class="comment" v-else v-for="comment of comments">
                    <div class="header"><img class="avatar" :src="comment.author.avatarUrls['16x16']" />
                        {{ comment.author.displayName }}: <span class="time"> {{ new
            Date(comment.created).toLocaleString() }}</span></div>
                    <AdfDoc class="content" :node="comment.body" />
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
#container {
    max-height: 100%;
    overflow: scroll;
}

#issue {
    text-align: left;
}

h1 {
    text-align: center
}

h2,
h3,
h4,
h5,
h6 {
    margin: 0.5rem 0 0.3rem 0;
}

.comment .header {
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 0.5rem
}

.comment .avatar {
    height: 1.5rem;
}

.comment .time {
    font-weight: lighter;
}

.comment .content {
    padding: 0.25rem;
}
</style>
../IssueFlair../stores/IssueCache