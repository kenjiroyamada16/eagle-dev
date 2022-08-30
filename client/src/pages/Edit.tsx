import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Student } from '../entity/entity'
import axios from 'axios'

const Edit = (props : any) => {
    const [student, setStudent] = useState<Student>()
    const [stdLvl, setStdLvl] = useState('iniciante')
    
    const { email } = useParams()
    const navigate = useNavigate()
    const [jsonName, setJsonName] = useState('')
    const [jsonAge, setJsonAge] = useState('')
    const [jsonLanguage, setJsonLanguage] = useState('')

    useEffect(()=>{
        axios.get(`https://eagle-dev-nico.herokuapp.com/user/${email}`)
            .then(res =>{
                setStudent(res.data)
                setJsonName(res.data.name)
                setJsonAge(res.data.age)
                setJsonLanguage(res.data.language)
            })
            .catch(err=>console.log(err))
    },[])

    const editStd = () =>{
        axios.put(`https://eagle-dev-nico.herokuapp.com/edit/${email}`,{
            name: jsonName,
            age: jsonAge,
            language: jsonLanguage
        })
        .then((res)=>{
            navigate('/dashboard')
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className='edit-main'>
            <p className="edit-form-title">Editar dados de { student ? student.name : null }</p>
            <div className="student-email">Email: { student ? student.email : null }</div>
            <div className="edit-form-container">
                <div className="input-wrap">
                    <input
                        value={jsonName}
                        onChange={(txt)=>setJsonName(txt.target.value)} 
                        required
                        type="text" />
                    <label className='label-edit'>Nome completo</label>
                </div>
                <div className="input-wrap">
                    <input
                        value={jsonAge}
                        onChange={(txt)=>setJsonAge(txt.target.value)} 
                        required
                        type="text" />
                    <label className='label-edit'>Idade</label>
                </div>
                <div className="selector-container">
                <p className='label-begg'>Nível do aluno</p>
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
                                value={jsonLanguage}
                                onChange={(txt)=>setJsonLanguage(txt.target.value)} 
                                required
                                type="text" />
                            <label className='label-edit'>Linguagem Preferida</label>
                        </div>
                    </div>
                }
                <button onClick={editStd} className="submit-edit">Editar</button>
            </div>
        </div>
  )
}

export default Edit
