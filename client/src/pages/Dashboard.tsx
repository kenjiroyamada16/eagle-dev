import { response } from "express";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Student } from "../entity/entity";
import axios from 'axios'

const $ = require('jquery')

const Dashboard = (navigation : any) =>{
    const [api, setApi] = useState<Student[]>([])
    const navigate = useNavigate()
    let isDocValid = false

    useEffect(() => {
        axios.get('https://eagle-dev-nico.herokuapp.com/table')
            .then(res => {
                const students = res.data
                setApi(students)
            })
            .then(res => emptyCheck(res))
            .catch((err) => console.log(err))
      }, [])

    const emptyCheck = (res : any) => {
        if(JSON.stringify(res) === '[{}]'){
            return true
        } else {
            return false
        }
    }

    emptyCheck(api) ? isDocValid = false : isDocValid = true

    const handleDelete = (email : any) =>{
        axios.delete(`https://eagle-dev-nico.herokuapp.com/delete/${email}`)
            .then(()=>window.location.reload())
    }

    const handleEdit = (email : any) =>{
        navigate(`/edit/user/${email}`)
    }
    
    return(
        <div className="dashboard-main">
            <div className="table-container">
                <div className="flex-wrap">
                    <p className="table-title">Alunos cadastrados</p>
                </div>
                <table id="students-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Idade</th>
                            <th>Linguagem preferida</th>
                            <th colSpan={2}></th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            isDocValid ? api.map((std, i) => (
                                <tr key={i}>
                                        <td>{ std.name ? std.name : "Não informado" }</td>
                                        <td>{ std.email }</td>
                                        <td>{ std.age ? std.age : "Não informado" }</td>
                                        <td>{ std.language ? std.language : "Nenhuma" }</td>
                                        <td><button 
                                            onClick={()=>handleEdit(std.email)} 
                                            className="btn-edit">Editar</button></td>
                                        <td><button 
                                            onClick={()=>handleDelete(std.email)}
                                            className="btn-delete">Excluir</button></td>
                                </tr>
                            ))
                            :
                                <tr>
                                    <td colSpan={5}>Nenhum registro de aluno</td>
                                </tr>
                        }
                    </tbody>
                </table>
                <Link to="/register"><button className="btn-create">Cadastrar aluno</button></Link>
            </div>
        </div>
    )
}

export default Dashboard
