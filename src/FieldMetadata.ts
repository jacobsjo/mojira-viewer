
export namespace FieldMetadata {
    export const seachable = [
        "status",
        "resolution",
        "Confirmation Status",
        "Mojang Priority",
        "category",
        "labels",
        "Area",
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
        "Mojang Priority",
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
        "Confirmation Status": {
            options: [
                "Unconfirmed",
                "Confirmed",
                "Community Consensus",
                "Plausible"
            ]
        },
        "Mojang Priority": {
            options: [
                'EMPTY',
                "Low",
                "Normal",
                "Important",
                "Very Important"
            ]
        },
        category: {
            options: [],
            any: true
        },
        labels: {
            options: [],
            any: true
        },
        "Area": {
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