import React, { useState } from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, onAuthStateChanged, getAuth, UserCredential } from 'firebase/auth'
import { validateEmail } from '../firebase'

export const Login = (props : any) => {
    const [emailLogin, setEmailLogin] = useState('')
    const [passLogin, setPassLogin] = useState('')
    const [user, setUser] = useState<UserCredential>()
    const mAuth = getAuth()
    const navigate = useNavigate()

    onAuthStateChanged(auth, (login)=>{
        if(mAuth.currentUser){
            navigate('/dashboard')
            const uid = mAuth.currentUser.uid
        }
    })

    const handleLogin = async () =>{
        if (emailLogin !== '' && passLogin !== '' && emailLogin.match(validateEmail)) {
            try {
                const mUser = await signInWithEmailAndPassword(
                    auth,
                    emailLogin,
                    passLogin
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
                onChange={(txt)=>setEmailLogin(txt.target.value)} 
                placeholder="E-mail" 
                type="email" />
            <input 
                onChange={(txt)=>setPassLogin(txt.target.value)} 
                placeholder="Senha" 
                type="password" />
            <button 
                onClick={handleLogin} 
                className="btnLogin">Entrar</button>
        </div>
    </div>
  )
}
