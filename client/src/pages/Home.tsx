import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Login } from "../components/Login";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Register } from "../components/Register";

const Home = () => {
    const [action, setAction] = useState('login')
    const [prevAction, setPrevAction] = useState('register')

    useEffect(()=>{
        signOut(auth)
    },[])

    const handleSwap = () =>{
        setPrevAction(action)
        setAction(prevAction)
    }

    return (
        <div className="home-main"> 
            <div className="home-side1">
                <img className="home-background" src="https://png.pngtree.com/thumb_back/fh260/background/20210804/pngtree-modern-simple-elegant-beautiful-color-website-landing-page-background-image_757350.jpg" alt="" />
                <h1>Eagle Dev</h1>
                <p className="home-subh1">A escola de programação <br/> para crianças e adolescentes</p>
                <div className="animated-bg">
                    <div className="wave"></div>
                </div>
            </div>
            <div className="home-side2">
                <div className="home-form-container">
                    <div className="home-swap">
                        {
                            action == 'register' 
                            ?
                            <div className="swap-trans">
                                <Register />
                            </div>
                            :
                            <div className="swap-trans">
                                <Login/>
                            </div>
                        }
                    </div>
                </div>
            <button 
                onClick={handleSwap} 
                className="btn-swap">
                    {
                        action == 'register' 
                        ? 
                        'Já tem uma conta? Entre' 
                        :
                        'Não tem uma conta? Registre-se' }</button>
            </div>
        </div>
    )
}

export default Home