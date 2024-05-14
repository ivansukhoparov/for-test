export type VideoDBType = {
    id: number, //integer($int32)
    title: string, //required*
    author:  string, //required*
    canBeDownloaded: boolean, //by default - false
    minAgeRestriction: number| null, //integer($int32)
    createdAt: string, //($date-time)
    publicationDate: string, //($date-time)
    availableResolutions: Array<string>| null, // nullable: true Enum [ 'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' ] nullable: true
    banned: boolean
}
