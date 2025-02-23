

export function parseString(str: string){
    const trimmed = str.trim()
    return trimmed.match(/^"(.*)"$/)?.[1] ?? trimmed.match(/^'(.*)'$/)?.[1] ?? trimmed
}

export function encodeString(str: string){
    if (str.includes(' ') || str.includes('@')){
        return `"${str}"`
    }
    return str
}