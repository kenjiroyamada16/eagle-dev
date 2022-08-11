import express from 'express'
import { Student } from './entity';

const admin = require("firebase-admin");
const serviceAccount = require("../key.json");
const bodyParser = require('body-parser')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()
const app = express()
const stdRef = db.collection("alunos")
// const path = require('path')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

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

app.get('/dashboard', async (req, res) =>{
    try{
        const response = await stdRef.get()
        let responseArray : Student[] = []
        response.forEach((e : any) => {
            responseArray.push(e.data())
        });
        res.send(responseArray)
    } catch (e){
        res.send('deu ruim')
    }
})

app.get('/', function(req, res){
    res.sendFile(__dirname+'../client/public/index.html');
});

app.listen(3000, ()=>{
    console.log('listening')
})