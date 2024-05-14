import express from 'express'
import { videosRouter } from './routers/videos-router'

 
export const app = express()

app.use(express.json())
app.use("/videos", videosRouter)

