import React, { useState } from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, onAuthStateChanged, getAuth, UserCredential } from 'firebase/auth'
import { validateEmail } from '../firebase'

export const Login = (props : any) => {
    const [emailLogin, setEmailLogin] = useState('')
    const [passLogin, setPassLogin] = useState('')
    const [user, setUser] = useState<any>()
    const [errFields, setErrFields] = useState('none')
    const [errLogin, setErrLogin] = useState('none')
    const [errMisc, setErrMisc] = useState('none')
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
                const mUser : any = await signInWithEmailAndPassword(
                    auth,
                    emailLogin,
                    passLogin
                )
                .then(()=>setUser(mUser))
                .then(()=>{
                    setErrFields('none')
                    setErrMisc('none')
                    setErrLogin('none')
                })
                .catch ((err)=>{
                    console.log(err)
                    if(err.code === 'invalid-email' || err.code === 'auth/wrong-password' || err.code ==='auth/user-not-found'){
                        setErrFields('none')
                        setErrMisc('none')
                        setErrLogin('block')
                    } else {
                        setErrFields('none')
                        setErrMisc('block')
                        setErrLogin('none')
                    }
                })
            } catch(err){
                setErrFields('none')
                setErrMisc('block')
                setErrLogin('none')
            }
        }
         else {
            setErrFields('block')
            setErrMisc('none')
            setErrLogin('none')
        }
    }
  return (
    <div className='login-main'>
        <p className="form-title">Entre</p>
        <p className="form-subh1">Para gerenciar seus registros</p>
        <div className="form">
            <div className="input-wrap">
                <input 
                    onChange={(txt)=>setEmailLogin(txt.target.value)} 
                    required
                    type="text" />
                <label>E-mail</label>
            </div>
            <div className="input-wrap">
                <input 
                    onChange={(txt)=>setPassLogin(txt.target.value)} 
                    required
                    type="password" />
                <label>Senha</label>
            </div>
            <button 
                onClick={handleLogin} 
                className="btnLogin">Entrar</button>
            <div style={{display: errFields}} className="login-err err-fields">Preencha todos os <br/>campos corretamente</div>
            <div style={{display: errLogin}} className="login-err err-login">Login inválido</div>
            <div style={{display: errMisc}} className="login-err err-misc">Ops, houve um problema,<br/> tente novamente</div>
        </div>
    </div>
  )
}
