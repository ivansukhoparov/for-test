import { VideoDBType } from "../db/video-db-type"
import { VideoOutputModel } from "../types/videos"

export const mapDBtoView = (dbVideo: VideoDBType): VideoOutputModel => {
    return    { 
    id: dbVideo.id,
    title: dbVideo.title,
    author:  dbVideo.author,
    canBeDownloaded: dbVideo.canBeDownloaded,
    minAgeRestriction: dbVideo.minAgeRestriction,
    createdAt: dbVideo.createdAt,
    publicationDate: dbVideo.publicationDate,
    availableResolutions: dbVideo.availableResolutions,
}
} 