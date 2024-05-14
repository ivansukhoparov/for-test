import express, {Request, Response, Express, Router} from 'express';
import { db } from '../db/db';
import { mapDBtoView } from './videos-mappers';
import { VideoDBType } from '../db/video-db-type';
import { VideoInputModel, VideoUpdateModel } from '../types/videos';
import { ParamType } from '../types';


export const videosRouter = Router()

videosRouter.get("/", async (req: Request, res:Response) => {
const videos = db.videos;

res.json(videos.map(mapDBtoView))
})

videosRouter.get('/:id', async (req: Request<ParamType>, res:Response) => {
const id = req.params.id;

const  video: VideoDBType | undefined = db.videos.find((video: VideoDBType) => (video.id === +req.params.id)) 
    
if (video) {res.json(mapDBtoView(video))
    return
}
else {res.sendStatus(404)
    return
}
})

videosRouter.post('/', async (req: Request<{},{},VideoInputModel>, res:Response) => {
    const inputModel:VideoInputModel = req.body // CHNAGE ALL REQ.BODY TO INPUTMODEL AS IT WILL WORK BETTER

    //Move types to types
    type ErrorMessage={
        "message": string
        "field": string
    }

    type ErrorsMessages={
        errorsMessages: Array<ErrorMessage>
    }

    const errors:ErrorsMessages = {
        "errorsMessages":[]
            }
    
    if (!req.body.title || typeof req.body.title !== 'string' || !req.body.title.trim() || req.body.title.length > 40) {
        const error:ErrorMessage = {
            "message": "Incorrect video title",
            "field": "title"
            }
    errors.errorsMessages.push(error)}
        
    if (!req.body.author || typeof req.body.author !== 'string' || !req.body.author.trim() || req.body.author.length > 20) {
        const error:ErrorMessage = {
            "message": "Incorrect video author",
            "field": "author"
            }
    errors.errorsMessages.push(error)}

if (errors.errorsMessages.length >0){
    res.status(400).json(errors)
    return
}
    
var publicationDate = new Date();
publicationDate.setDate(publicationDate.getDate() + 1);

let availableResolutions=null
if (req.body.availableResolutions){
    availableResolutions=req.body.availableResolutions
}

const newVideo:VideoDBType = {
    id: +(new Date()),
    title: req.body.title,
    author: req.body.author,
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: (new Date()).toISOString(),
    publicationDate: publicationDate.toISOString(),
    availableResolutions:availableResolutions,
    banned: false
}

db.videos.push(newVideo)
        
res.json(mapDBtoView(newVideo))
}) 



videosRouter.put('/:id', async (req: Request<ParamType,{},VideoUpdateModel>, res:Response) => {
    const id = req.params.id
    const  video: VideoDBType | undefined = db.videos.find((video: VideoDBType) => (video.id === +req.params.id)) 
        
    if (!video) {res.sendStatus(404)
        return
    }

    

    //Move types to types
    type ErrorMessage={
        "message": string
        "field": string
    }

    type ErrorsMessages={
        errorsMessages: Array<ErrorMessage>
    }

    const errors:ErrorsMessages = {
        "errorsMessages":[]
            }
    
    if (!req.body.title || typeof req.body.title !== 'string' || !req.body.title.trim() || req.body.title.length > 40) {
        const error:ErrorMessage = {
            "message": "Incorrect video title",
            "field": "title"
            }
    errors.errorsMessages.push(error)}
        
    if (!req.body.author || typeof req.body.author !== 'string' || !req.body.author.trim() || req.body.author.length > 20) {
        const error:ErrorMessage = {
            "message": "Incorrect video author",
            "field": "author"
            }
    errors.errorsMessages.push(error)}

if (errors.errorsMessages.length >0){
    res.status(400).json(errors)
    return
}
    

const updatedVideo:VideoDBType = {
    ...video,

    // const aa = {
    //     a:1, 
    //     b:2
    // }
    
    // const bb = {
    //     ...aa,
    //     c:3
    // }
    
    // const bb = {
    //     a:1, 
    //     b:2,
    //     c:3
    // }

    title: req.body.title,
    author: req.body.author,
    canBeDownloaded: req.body.canBeDownloaded,
    minAgeRestriction: req.body.minAgeRestriction,
    publicationDate: req.body.publicationDate,
    availableResolutions:req.body.availableResolutions
}

const videoIndex = db.videos.findIndex((v:any) => v.id === video.id )
db.videos.splice(videoIndex, 1, updatedVideo)
        
res.json(mapDBtoView(updatedVideo))
}) 

videosRouter.delete('/:id', async (req: Request<ParamType>, res:Response) => {
    const id = req.params.id;
    
    const  video: VideoDBType | undefined = db.videos.find((video: VideoDBType) => (video.id === +req.params.id)) 
        
    if (video) {res.json(mapDBtoView(video))
        const videoIndex = db.videos.findIndex((v:any) => v.id === video.id )
db.videos.slice(videoIndex, videoIndex+1)
res.sendStatus(204)
    return
    }
    else {res.sendStatus(404)
        return
    }
    })








































