import { response } from "express";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Student } from "../../../server/entity";
import axios from 'axios'

const Dashboard = () =>{
    const [api, setApi] = useState<Student[]>([])
    const navigate = useNavigate()
    let isDocValid = false

    useEffect(() => {
        axios.get('http://localhost:8080/table')
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
        axios.delete(`http://localhost:8080/delete/${email}`)
            .then(()=>window.location.reload())
    }

    const handleEdit = (email : any) =>{

    }
    
    return(
        <div className="main">
            <h1>Tabela de alunos</h1>
            <h1 id="teste"></h1>
            <div className="table-container">
                <table id="students-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
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
                                    <td>{ std.age ? std.age : "Não informado" }</td>
                                    <td>{ std.language ? std.language : "Nenhuma" }</td>
                                    <td><button onClick={()=>handleEdit(std.email)} className="edit-btn">Editar</button></td>
                                    <td><button onClick={()=>handleDelete(std.email)} className="delete-btn">Excluir</button></td>
                                </tr>
                            ))
                            :
                                <tr>
                                    <td colSpan={5}>Nenhum registro de aluno</td>
                                </tr>
                        }
                    </tbody>
                </table>
                <Link to="/register"><button className="btn-create">Registrar</button></Link>
            </div>
        </div>
    )
}

export default Dashboard