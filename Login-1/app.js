const express = require('express')
const app = express()

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req,res)=>{
    res.send('App running succesfully')
})

app.get('/login', (req,res)=>{
    res.send(req.query)
})
app.post('/login', (req,res)=>{
    res.send(req.query)
})

const port = process.env.PORT || 3000

app.listen(3000, ()=>{
    try {
        console.log(`App is listening on port ${port}...`)
    } catch (error) {
        console.log(error)       
    }
})