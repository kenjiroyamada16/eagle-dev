import { response } from "express";
import React, { useEffect, useState } from "react"
import { Student } from "../../../server/entity";

function Dashboard(){
    const [apiData, setApiData] = useState<Student[]>([])

    useEffect(() => {
        fetch("http://localhost:3001/dashboard", {
            method: 'get',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin" : "*", 
                "Access-Control-Allow-Credentials" : "true" 
              },
          })
          .then((res) => res.json())
          .then((data) => setApiData(data))
          .then(() => createTable(null))
          .then((data) => console.log(data))
      }, [])

        const table = document.getElementById('students-table')
        let row : string = ''

        const createTable = (e : any) =>{
            if (e == null){
                for (let i = 0; i < apiData.length; i++){
                    row = `<tr>
                                    <th>
                                        ${apiData[i].name.toString()}
                                    </th>
                                    <th>
                                        ${apiData[i].age.toString()}
                                    </th>
                                    <th>
                                        ${apiData[i].language.toString()}
                                    </th>
                            </tr>`
                    table!!.innerHTML += row
                }
            } else {
                row = `<tr>
                            <th>Erro</th>   
                        </tr>`
                table!!.innerHTML = row
            }
            console.log(row)
    }
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
                   { row }
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard