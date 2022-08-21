import express from 'express'
import { Student } from './entity';

const admin = require("firebase-admin");
const cors = require('cors')
const serviceAccount = require("../key.json");
const bodyParser = require('body-parser')
const path = require('path')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()
const app = express()
const stdRef = db.collection("teste")
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("../public", express.static("../public"));

app.post('/create', async (req, res)=>{
    try {
        const id = req.body.name
        const std : Student = {
            name: req.body.name,
            age: req.body.age,
            language: req.body.language
        }
        const response = await stdRef.doc(id).set(std)
        res.send(response)
    } catch(e) {
        res.send('deu ruim')
    }
})

app.get('/table', async (req, res) =>{
    try{
        const response = await stdRef.get()
        let responseArray : Student[] = []
        response.forEach((e : any) => {
            responseArray.push(e.data())
        });
        res.send(responseArray)
        return responseArray
    } catch (e){
        res.send('deu ruim')
    }
})

app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname, '../client/public', 'index.html'))
})

app.listen(PORT, ()=>{
    console.log(`listening to port ${PORT}`)
})