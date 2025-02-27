import { FieldMetadata } from "./FieldMetadata"
import { encodeString, parseString } from "./util"


export type BasicSearchData = {
    project: BasicSearchDataField.Select,
    text: BasicSearchDataField.Fuzzy,
    search: BasicSearchDataField[],
    sort: string | null,
    sortAsc: boolean,
}

export namespace BasicSearchData {
    export function toJql(data: BasicSearchData): string {
        if (data === null) return ""
        var jql = [data.project, data.text, ...data.search].map(s => s.toJql()).filter(j => j !== null).join(" AND ")
        if (data.sort !== null) {
            if (jql !== "")
                jql += " AND "
            jql += `${encodeString(data.sort)} IS NOT EMPTY ORDER BY ${encodeString(data.sort)} ${data.sortAsc ? "ASC" : "DESC"}`
        }
        return jql
    }

    export function tryParseJql(jql: string): BasicSearchData | undefined {
        const jqlParts = jql.split(' AND ')

        const newData: BasicSearchData = {
            project: new BasicSearchDataField.Select("project", []),
            text: new BasicSearchDataField.Fuzzy("text", ""),
            search: [],
            sort: null,
            sortAsc: true
        }

        // try parse sort option
        const lastPart = jqlParts[jqlParts.length - 1].trim()
        const matchSearch = lastPart.match(/^(.+) [iI][sS] [nN][oO][tT] [eE][mM][pP][tT][yY] [oO][rR][dD][eE][rR] [bB][yY] (.+?)( [aA][sS][cC]| [dD][eE][sS][cC])?$/)
        if (matchSearch && matchSearch[1] === matchSearch[2]) {
            newData.sort = parseString(matchSearch[1])
            newData.sortAsc = matchSearch[3].toUpperCase() !== " DESC"
            jqlParts.pop()
        }

        var hasProject = false
        var hasText = false

        for (const jqlPart of jqlParts) {
            if (jqlPart === "") continue
            const partData = BasicSearchDataField.tryParseJqlPart(jqlPart)
            if (partData === undefined) {
                console.warn("unparsable")
                return undefined
            }

            if (!hasProject && partData.field === "project" && partData instanceof BasicSearchDataField.Select) {
                newData.project = partData
                hasProject = true
            } else if (!hasText && partData.field === "text" && partData instanceof BasicSearchDataField.Fuzzy) {
                newData.text = partData
                hasText = true
            } else {
                newData.search.push(partData)
            }
        }

        return newData
    }

}


export abstract class BasicSearchDataField {
    private static lastKey = 0
    public readonly key: number

    constructor(
        public readonly field: string,
    ){
        this.key = BasicSearchDataField.lastKey++;
    }

    public abstract toJql(): string | null
    public static tryParseJqlPart(jql: string){
        return this.Select.tryParseJqlPart(jql)
            ?? this.Comparison.tryParseJqlPart(jql)
            ?? this.Fuzzy.tryParseJqlPart(jql)
    }
}

export namespace BasicSearchDataField {
    export class Select extends BasicSearchDataField {
        constructor(
            field: string,
            public selected: string[]
        ){
            super(field)
        }

        public toJql(): string | null {
            if (this.selected.length === 0){
                return null
            } else if (this.selected.length === 1){
                return `${encodeString(this.field)} = ${encodeString(this.selected[0])}`
            } else {
                return `${encodeString(this.field)} IN (${this.selected.map(encodeString).join(', ')})`
            }
        }

        public static tryParseJqlPart(jql: string){
            const matchSingle = jql.match(/^([^<=>]*)=(.*)$/)
            if (matchSingle && Object.keys(FieldMetadata.Select).includes(parseString(matchSingle[1]))) {
                return new Select(parseString(matchSingle[1]), [parseString(matchSingle[2])])
            }
            const matchMulti = jql.match(/^(.*) [iI][nN] \(([^\)]*)\)$/)
            if (matchMulti && Object.keys(FieldMetadata.Select).includes(parseString(matchMulti[1]))) {
                return new Select(parseString(matchMulti[1]), matchMulti[2].split(',').map(parseString))
            }
            return undefined
        }        
    }

    export class Comparison extends BasicSearchDataField {
        constructor(
            field: string,
            public comparator: string,
            public value: string,
        ){
            super(field)
        }

        public toJql(): string | null {
            if (this.value === null || this.value === ""){
                return null
            } else {
                return `"${this.field}" ${this.comparator} ${encodeString(this.value)}`
            }
        }

        public static tryParseJqlPart(jql: string){
            const match = jql.match(/^([^<=>]*)(<=|<|=|>|>=)(.*)$/)
            if (match && Object.keys(FieldMetadata.Compare).includes(parseString(match[1]))) {
                return new Comparison(parseString(match[1]), match[2], parseString(match[3]))
            }
            return undefined
        }        
    }

    export class Fuzzy extends BasicSearchDataField {
        constructor(
            field: string,
            public value: string,
        ){
            super(field)
        }

        public toJql(): string | null {
            if (this.value === ""){
                return null
            } else {
                return `"${this.field}" ~ "${this.value}"`
            }
        }

        public static tryParseJqlPart(jql: string){
            const match = jql.match(/^["']([^'"]*)['"] ~ ["']([^'"]*)['"]$/)
            if (match) {
                return new Fuzzy(match[1], match[2])
            }
            return undefined
        }        
    }
}