import express from 'express'
import { Student } from './entity';
import { auth, application } from '../client/src/firebase';
import { getAuth, onAuthStateChanged, UserCredential } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore';
import { async } from '@firebase/util';

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
let stdRef = db.collection('alunos')
const PORT = process.env.PORT || 8080
const mAuth = getAuth(application)

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("../public", express.static("../public"));

//crud

app.post('/create', async (req, res)=>{
        try {
            const id = req.body.email
            const std : Student = {
                id: id,
                name: req.body.name,
                email: id,
                age: req.body.age,
                language: req.body.language
            }
            //Talvez seja útil VVVVVVV
            /* const stdDoc = stdRef.doc(id)
            stdDoc.get()
                .then((docSnapshot : any)=>{
                    if(docSnapshot.exists){
                        stdDoc.onSnapshot((doc : any)=>{
                            res.status(400).send({
                                message: 'duplicate-email'
                            })
                            return
                        })
                    } else{
                        const response = stdDoc.set(std)
                        res.send(response)
                    }
                })  */
            if(!stdRef.doc(id).get().exists){
                const response = await stdRef.doc(id).set(std)
                res.send(response)
            } else{
                res.status(400).send({
                    message: 'duplicate-email'
                })
            }
        } catch(e) {
            res.status(400).send()
        }
})

app.put('/edit/:id', async (req, res)=>{
    try {
        const std : Student = {
            id: req.params.id,
            name: req.body.name,
            email: req.params.id,
            age: req.body.age,
            language: req.body.language
        }
        const response = await stdRef.doc(req.params.id).update(std)
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

app.get('/user/:id', async (req, res) =>{
    const id = req.params.id
    try{
        stdRef.doc(id).get()
            .then((snapshot : any)=>{
                res.send(snapshot.data())
                return
            })
        
    } catch (e){
        res.status(400).send('deu ruim')
        return
    }
})

app.delete('/delete/:id', async (req, res) =>{
    try {
        const response = await stdRef.doc(req.params.id).delete()
        res.send(response)
    } catch(e){
        res.send('deu ruim')
    }
})

app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname, '../client/public', 'index.html'))
})

app.listen(PORT, ()=>{
    console.log(`listening to port ${PORT}`)
})

//crud