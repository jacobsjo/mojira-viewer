
export async function search(jql: string, startAt: number = 0): Promise<any> {
    var requestJql = 'votes < 0 OR '
    if (jql === '' || jql.startsWith("ORDER BY")){
        requestJql += 'votes >= 0 '
    }
    requestJql += jql

    const response = await fetch('https://bugs.mojang.com/api/jql-search-post', {
        method: "POST",
        headers: new Headers([["Content-Type", "application/json"]]),
        body: JSON.stringify({
            "advanced": true,
            "project": 'MC',
            "startAt": startAt,
            "maxResults": 20,
            "search": requestJql
        })
    })
    return await response.json()
}

export async function getIssue(id: string): Promise<any> {
    const project = id.split('-')[0]
    const response = await fetch('https://bugs.mojang.com/api/jql-search-post', {
        method: "POST",
        headers: new Headers([["Content-Type", "application/json"]]),
        body: JSON.stringify({
            "advanced": true,
            "project": project,
            "startAt": 0,
            "maxResults": 1,
            "search": `key = ${id}`
        })
    })
    const searchResult = await response.json()

    if (searchResult.issues === undefined || searchResult.issues.length !== 1) {
        throw new Error('Could not find issue')
    }

    return searchResult.issues[0]
}

export async function getIssues(ids: string[]): Promise<any> {
    const response = await fetch('https://bugs.mojang.com/api/jql-search-post', {
        method: "POST",
        headers: new Headers([["Content-Type", "application/json"]]),
        body: JSON.stringify({
            "advanced": true,
            "project": 'MC',
            "startAt": 0,
            "maxResults": 50,
            "search": `votes<0 OR key in (${ids})`
        })
    })
    const searchResult = await response.json()

    if (searchResult.issues === undefined) {
        throw new Error('Could not find issues')
    }

    return searchResult.issues
}


export async function getComments(id: string): Promise<any> {
    const response = await fetch('https://bugs.mojang.com/api/issue-comment-get', {
        method: "POST",
        headers: new Headers([["Content-Type", "application/json"]]),
        body: JSON.stringify({
            issueKey: id
        })
    })
    return await response.json() as any[]
}

export async function getJsdRequest(id: string): Promise<any> {
    const response = await fetch(`https://mojira.atlassian.net/rest/servicedeskapi/request/${id}?expand=comment,comment.renderedBody`)
    return await response.json()
}
