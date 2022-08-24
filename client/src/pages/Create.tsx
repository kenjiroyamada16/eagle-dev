import React from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Create = (props : any) => {
    const [stdEmail, setStdEmail] = useState('')
    const [stdName, setStdName] = useState('')
    const [stdAge, setStdAge] = useState('')
    const [stdLvl, setStdLvl] = useState('iniciante')
    const [stdLanguage, setStdLanguage] = useState('')

    const navigate = useNavigate()

    const handleSubmit = () =>{
        axios.post('http://localhost:8080/create', {
            email: stdEmail,
            name: stdName,
            age: stdAge,
            language: stdLanguage
        })
        .then(()=>navigate('/dashboard'))
    }

    return (
        <div className='create-main'>
            <div className="create-form-container">
                <p className="create-form-title">Registrar um aluno</p>
                <input 
                    onChange={(value)=>setStdEmail(value.target.value)} 
                    type="email" 
                    placeholder='E-mail' />
                <input 
                    onChange={(value)=>setStdName(value.target.value)} 
                    type="text" 
                    placeholder='Nome completo' />
                <input 
                    onChange={(value)=>setStdAge(value.target.value)} 
                    type="text" 
                    placeholder='Idade' />
                <p className='label-begg'>Nível do aluno</p>
                <select value={stdLvl} onChange={(e)=>setStdLvl(e.target.value)}>
                    <option value="iniciante">Iniciante</option>
                    <option value="intermediario">Intermediário</option>
                    <option value="avancado">Avançado</option>
                </select>
                { 
                    stdLvl == 'iniciante' ? <div></div> 
                    : 
                    <div className="language-container">
                        <p>Linguagem de programação de preferência</p>
                        <input type="text" onChange={(value)=>setStdLanguage(value.target.value)} />
                    </div>
                }
                <button onClick={handleSubmit} className="submit-create">Registrar</button>
            </div>
        </div>
  )
}

export default Create
