import React, { useState } from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, onAuthStateChanged, getAuth, UserCredential } from 'firebase/auth'
import { validateEmail } from '../firebase'

export default function Register() {
    const [emailRegister, setEmailRegister] = useState('')
    const [passRegister, setPassRegister] = useState('')
    const [user, setUser] = useState<UserCredential>()
    const navigate = useNavigate()

    onAuthStateChanged(auth, (login)=>{
        navigate('')
    })

    const handleRegister = async () =>{
        if (emailRegister !== '' && passRegister !== '' && emailRegister.match(validateEmail)) {
            try {
                const mUser = await signInWithEmailAndPassword(
                    auth,
                    emailRegister,
                    passRegister
                )
                setUser(mUser)
            } catch (err){
                //TODO
                console.log(err)
            }
        } else {
            //TODO
            console.log('campos vazios')
        }
    }
  return (
    <div>
        <p className="form-title">Entre</p>
        <p className="form-subh1">Para gerenciar seus registros</p>
        <div className="form">
            <input 
                onChange={(txt)=>setEmailRegister(txt.target.value)} 
                placeholder="E-mail" 
                type="email" />
            <input 
                onChange={(txt)=>setPassRegister(txt.target.value)} 
                placeholder="Senha" 
                type="password" />
            <button 
                onClick={handleRegister} 
                className="btnLogin">Entrar</button>
        </div>
    </div>
  )
}