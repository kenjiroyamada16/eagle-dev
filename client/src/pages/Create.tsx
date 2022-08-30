import React from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { validateEmail } from '../firebase'

const Create = () => {
    const [stdEmail, setStdEmail] = useState('')
    const [stdName, setStdName] = useState('')
    const [stdAge, setStdAge] = useState('')
    const [stdLvl, setStdLvl] = useState('iniciante')
    const [stdLanguage, setStdLanguage] = useState('')
    const [errFields, setErrFields] = useState('none')
    const [errEmail, setErrEmail] = useState('none')
    const [errMisc, setErrMisc] = useState('none')

    const navigate = useNavigate()

    const registerStd = () =>{
        axios.post('https://eagle-dev-nico.herokuapp.com/create', {
            email: stdEmail,
            name: stdName,
            age: stdAge,
            language: stdLanguage
        })
        .then(()=>navigate('/dashboard'))
        .catch((err)=>{
            if(err.response.data.message == 'duplicate-email'){
                setErrFields('none')
                setErrEmail('block')
                setErrMisc('none')
            } else{
                setErrFields('none')
                setErrEmail('none')
                setErrMisc('block')
            }
        })
    }

    const handleSubmit = () =>{
        if(stdEmail != '' && stdAge != '' && stdName != '' && stdEmail.match(validateEmail)){
            registerStd()
        } else{
            setErrFields('block')
            setErrEmail('none')
            setErrMisc('none')
        }
    }

    return (
        <div className='create-main'>
        <p className="create-form-title">Registrar um aluno</p>
            <div className="create-form-container">
                <div className="input-wrap">
                    <input 
                        onChange={(txt)=>setStdEmail(txt.target.value)} 
                        required
                        type="text" />
                    <label>E-mail</label>
                </div>
                <div className="input-wrap">
                    <input 
                        onChange={(txt)=>setStdName(txt.target.value)} 
                        required
                        type="text" />
                    <label>Nome completo</label>
                </div>
                <div className="input-wrap">
                    <input 
                        onChange={(txt)=>setStdAge(txt.target.value)} 
                        required
                        type="text" />
                    <label>Idade</label>
                </div>
                <p className='label-begg'>Nível do aluno</p>
                <div className="selector-container">
                    <select value={stdLvl} onChange={(e)=>setStdLvl(e.target.value)}>
                        <option value="iniciante">Iniciante</option>
                        <option value="intermediario">Intermediário</option>
                        <option value="avancado">Avançado</option>
                    </select>
                </div>
                { 
                    stdLvl == 'iniciante' ? <div></div> 
                    : 
                    <div className="language-container">
                        <div className="input-wrap">
                            <input 
                                onChange={(txt)=>setStdLanguage(txt.target.value)} 
                                required
                                type="text" />
                            <label>Linguagem Preferida</label>
                        </div>
                    </div>
                }
                <div style={{display: errFields}} className="create-err err-fields">Preencha todos os campos</div>
                <div style={{display: errEmail}} className="create-err err-email">E-mail já registrado</div>
                <div style={{display: errMisc}} className="create-err err-misc">Ops, houve um problema<br/>Tente novamente</div>
                <button onClick={handleSubmit} className="submit-create">Registrar</button>
            </div>
        </div>
  )
}

export default Create
