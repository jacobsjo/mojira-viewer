
export class IssueFlair {
    constructor(
        public readonly clss: string,
        public readonly description: string
    ) { }

    public static IssueFlairs = {
        Unconfirmed: new IssueFlair('new','Unconfirmed'),
        Open: new IssueFlair('new','Open'),
        CommunityConsensus: new IssueFlair('confirmed','Community Consensus'),
        Confirmed: new IssueFlair('confirmed', 'Confirmed'),
        Plausible: new IssueFlair('confirmed', 'Plausible'),
        PrioLow: new IssueFlair('mojang-confirmed low','Low Priority'),
        PrioNormal: new IssueFlair('mojang-confirmed normal', 'Normal Priority'),
        PrioImportant: new IssueFlair('mojang-confirmed important', 'Important'),
        PrioVeryImportant: new IssueFlair('mojang-confirmed veryImportant', 'Very Important'),
        InProgress: new IssueFlair('in-progress','In Progress'),
        Fixed: new IssueFlair('fixed', 'Fixed'),
        Done: new IssueFlair('fixed', 'Done'),
        Duplicate: new IssueFlair('invalid', 'Duplicate'),
        Invalid: new IssueFlair('invalid', 'Invalid'),
        WorksAsIntended: new IssueFlair('invalid', 'Works As Intended'),
        WontFix: new IssueFlair('invalid', 'Won\'t Fix'),
        AwaitingResponse: new IssueFlair('invalid', 'Awaiting Response'),
        Incomplete: new IssueFlair('invalid', 'Incomplete'),
        CannotReproduce: new IssueFlair('invalid', 'Cannot Reproduce'),
        Closed: new IssueFlair('invalid', 'Closed'),
        Unknown: new IssueFlair('unknown', '')
    } 

    public static getIssueFlair(fields: any): IssueFlair {
        if (fields.status.name === 'Open' || fields.status.name === 'Reopened') {
            switch (fields.customfield_10049?.value) {
                case "Low":
                    return IssueFlair.IssueFlairs.PrioLow
                case "Normal":
                    return IssueFlair.IssueFlairs.PrioNormal
                case "Important":
                    return IssueFlair.IssueFlairs.PrioImportant
                case "Very Important":
                    return IssueFlair.IssueFlairs.PrioVeryImportant
            }
            switch (fields.customfield_10054?.value) {
                case "Confirmed":
                    return IssueFlair.IssueFlairs.Confirmed
                case "Community Consensus":
                    return IssueFlair.IssueFlairs.CommunityConsensus
                case "Plausible":
                    return IssueFlair.IssueFlairs.Plausible
                case "Unconfirmed":
                    return IssueFlair.IssueFlairs.Unconfirmed
            }
            return IssueFlair.IssueFlairs.Open
        } else if (fields.status.name === 'In Progress') {
            return IssueFlair.IssueFlairs.InProgress
        } else {
            switch (fields.resolution?.name) {
                case 'Fixed':
                    return IssueFlair.IssueFlairs.Fixed
                case 'Done':
                    return IssueFlair.IssueFlairs.Done
                case "Won't Fix":
                    return IssueFlair.IssueFlairs.WontFix
                case "Works As Intended":
                    return IssueFlair.IssueFlairs.WorksAsIntended
                case "Duplicate":
                    return IssueFlair.IssueFlairs.Duplicate
                case "Invalid":
                    return IssueFlair.IssueFlairs.Invalid
                case "Incomplete":
                    return IssueFlair.IssueFlairs.Incomplete
                case "Awaiting Response":
                    return IssueFlair.IssueFlairs.AwaitingResponse
                case "Cannot Reproduce":
                    return IssueFlair.IssueFlairs.CannotReproduce

            }
            return IssueFlair.IssueFlairs.Closed
        }

    }
}