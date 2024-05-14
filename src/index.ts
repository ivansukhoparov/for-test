import {app} from './app'
 
const port = 3000
app.listen(port, () => {
    console.log('...server started in port ' + port)
})



// import { app } from './settings'

// const port = process.env.PORT || 3999

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

