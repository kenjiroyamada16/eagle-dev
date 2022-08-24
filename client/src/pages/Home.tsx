import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Login } from "../components/Login";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Home = () => {
    useEffect(()=>{
        signOut(auth)
        console.log(auth.currentUser)
    })
    return (
        <div className="main">  
            <h1>Eagle Dev</h1>
            <p className="subh1">A escola de programação <br/> para crianças e adolescentes</p>
            <div className="form-container">
                <Login/>
            </div> 
        </div>
    )
}

export default Home