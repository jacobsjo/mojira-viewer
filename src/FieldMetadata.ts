
export namespace FieldMetadata {
    export const seachable = [
        "status",
        "resolution",
        "cf[10054]",
        "cf[10049]",
        "cf[10051]",
        "labels",
        "cf[10055]",
        "reporter",
        "affectedVersion",
        "fixVersion",
        "created",
        "updated",
        "resolved",
        "votes",
        "watchers",
    ]

    export const sortable = [
        'cf[10049]',
        "affectedVersion",
        "fixVersion",
        "created",
        "updated",
        "resolved",
        "votes",
        "watchers",
    ]

    export const Select: {[key: string]: {options: string[], any?: boolean}} = {
        project: {
            options: [
                "MC",
                "MCPE",
                "REALMS",
                "BDS",
                "MCL"
            ]
        },
        status: {
            options: [
                "Open",
                "In Progress",
                "Reopened",
                "Resolved"
            ]
        },
        resolution: {
            options: [
                'Unresolved',
                'Fixed',
                "Won't Fix",
                "Works As Intended",
                "Duplicate",
                "Invalid",
                "Incomplete",
                "Awaiting Response",
                "Cannot Reproduce"
            ]
        },
        'cf[10054]': {
            options: [
                "Unconfirmed",
                "Confirmed",
                "Community Consensus",
                "Plausible"
            ]
        },
        'cf[10049]': {
            options: [
                'EMPTY',
                "Low",
                "Normal",
                "Important",
                "Very Important"
            ]
        },
        'cf[10055]': {
            options: [],
            any: true
        },
        labels: {
            options: [],
            any: true
        },
        'cf[10051]': {
            options: [],
            any: true
        },
        reporter: {
            options: [],
            any: true
        }
    }

    export const Compare: {[key: string]: {options: string}} = {
        affectedVersion: {
            options: "Version"
        },
        fixVersion: {
            options: "Version"
        },
        created: {
            options: "Date"
        },
        updated: {
            options: "Date"
        },
        resolved: {
            options: "Date"
        },
        votes: {
            options: "Number"
        },
        watchers: {
            options: "Number"
        }
    }
}