import { response } from "express";
import React, { useEffect, useState } from "react"
import { Student } from "../../../server/entity";
import axios from 'axios'

const Dashboard = () =>{
    const [api, setApi] = useState<Student[]>([])
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

    const emptyCheck = (api : any) => {
        if(JSON.stringify(api) === '[{}]'){
            return true
        } else {
            return false
        }
    }

    emptyCheck(api) ? isDocValid = false : isDocValid = true
    
    return(
        <div className="main">
            <h1>Tabela de alunos</h1>
            <h1 id="teste"></h1>
            <table id="students-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Linguagem preferida</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                       isDocValid ? api.map((std, i) => (
                            <tr key={i}>
                                <td>{ std.name ?  std.name : "Não informado" }</td>
                                <td>{ std.age ?  std.age : "Não informado" }</td>
                                <td>{ std.language ?  std.language : "Nenhuma" }</td>
                                <td><button className="edit-btn">Editar</button></td>
                                <td><button className="delete-btn">Excluir</button></td>
                            </tr>
                        ))
                        :
                            <tr>
                                <td colSpan={5}>Nenhum registro de aluno</td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard