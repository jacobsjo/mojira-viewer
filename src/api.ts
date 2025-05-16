
export async function search(jql: string, page: number = 0): Promise<any> {
    jql = jql.trim()
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
            "page": page,
            "maxResults": 25,
            "search": requestJql
        })
    })
    return await response.json()
}

export async function getIssues(ids: string[]): Promise<any> {
    const response = await fetch('https://bugs.mojang.com/api/jql-search-post', {
        method: "POST",
        headers: new Headers([["Content-Type", "application/json"]]),
        body: JSON.stringify({
            "advanced": true,
            "project": 'MC',
            "page": 0,
            "maxResults": 50,
            "search": `votes<0 OR key in (${ids})`
        })
    })
    const searchResult = await response.json()

    if (searchResult.issues === undefined) {
        return []
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
