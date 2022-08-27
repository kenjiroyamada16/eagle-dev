import React, { useState } from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, onAuthStateChanged, getAuth, UserCredential } from 'firebase/auth'
import { validateEmail } from '../firebase'

export const Register = () => {
    const [emailRegister, setEmailRegister] = useState('')
    const [passRegister, setPassRegister] = useState('')
    const [user, setUser] = useState<UserCredential>()
    const [errFields, setErrFields] = useState('none')
    const [errLogin, setErrLogin] = useState('none')
    const [errMisc, setErrMisc] = useState('none')
    const navigate = useNavigate()
    const mAuth = getAuth()

    onAuthStateChanged(auth, (login)=>{
        if(mAuth.currentUser){
            navigate('/dashboard')
            const uid = mAuth.currentUser.uid
        }
    })

    const handleRegister = async () =>{
        if (emailRegister !== '' && passRegister !== '' && emailRegister.match(validateEmail)) {
            try {
                const mUser : any = await createUserWithEmailAndPassword(
                    auth,
                    emailRegister,
                    passRegister
                )
                .then(()=>setUser(mUser))
                .then(()=>{
                    setErrFields('none')
                    setErrMisc('none')
                    setErrLogin('none')
                })
                .catch ((err)=>{
                    console.log(err)
                    if(err.code === 'auth/email-already-in-use'){
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
    <div className='register-main'>
        <p className="form-title">Registre-se</p>
        <p className="form-subh1">Para começar seus cadastros</p>
        <div className="form">
        <div className="input-wrap">
                <input 
                    onChange={(txt)=>setEmailRegister(txt.target.value)} 
                    required
                    type="text" />
                <label>E-mail</label>
            </div>
            <div className="input-wrap">
                <input 
                    onChange={(txt)=>setPassRegister(txt.target.value)} 
                    required
                    type="password" />
                <label>Senha</label>
            </div>
            <button 
                onClick={handleRegister} 
                className="btnLogin">Registrar-se</button>
            <div style={{display: errFields}} className="login-err err-fields">Preencha todos os <br/> campos corretamente</div>
            <div style={{display: errLogin}} className="login-err err-login">E-mail em uso</div>
            <div style={{display: errMisc}} className="login-err err-misc">Ops, houve um problema,<br/> tente novamente</div>
        </div>
    </div>
  )
}