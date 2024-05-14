export type VideoOutputModel = {
    id: number, //integer($int32)
    title: string, //required*
    author:  string, //required*
    canBeDownloaded: boolean, //by default - false
    minAgeRestriction: number|null, //integer($int32)
    createdAt: string, //($date-time)
    publicationDate: string, //($date-time)
    availableResolutions: Array<string>|null, // nullable: true Enum [ 'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' ] nullable: true
}

export type VideoInputModel = {
    title: string,
    author: string,
    availableResolutions: Array<string>
  }

  export type VideoUpdateModel = {
    title: string, //required*
    author:  string, //required*
    canBeDownloaded: boolean, //by default - false
    minAgeRestriction: number, //integer($int32)
    publicationDate: string, //($date-time)
    availableResolutions: Array<string>, // nullable: true Enum [ 'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' ] nullable: true
}

//WHERE IS VIDEO CREATE MODEL, IS IT NEEDED?