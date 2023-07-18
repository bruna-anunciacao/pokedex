'use client'

import { useState } from "react"
import styles from "./form.module.css"
import Home from "../../pokedex/page"
import Logincard from "../login/LoginCard"
import { setemail } from "../../utilis/getuser"
import Tokenhandlers from "../../utilis/jwt"
import { getemail } from '../../utilis/getuser';

export default function Form(){
    const [userdata,setuserData] = useState({
        email:"",
        senha :""
    })

    const updateForm = (e:any, name :any)=> {
        setuserData({...userdata,
            [name]: e.target.value
        })
    }
    
    const submitForm = async (e:any) =>{
        e.preventDefault()
        try{
            const data = await fetch( `api/`, 
            {method:"POST", body: JSON.stringify(userdata)})
            
            const response = await data.json()
            console.log(response)
            
            
            if (data.status == 200 || data.status == 201) {
                setemail(userdata.email);
                console.log('olá');
                openHome();
                const ema = getemail();
                console.log(ema);
                await (async (ema: string) => {
                  try {
                    await fetch(`http://localhost:3000/api/favoritos/pegar/`, {
                      method: "POST",
                      body: JSON.stringify({ email: ema })
                    });
                  } catch (error) {
                    console.log(error);
                  }
                })(ema);
              }
              
            else{
                openAlert()
                throw new Error('Senha errada')
            }
            
        }catch(e){
            console.log("oi")
            console.log(e)
        }
    }

    const [showHome, setShowHome] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const openAlert = () => {
        setShowAlert(true);
    }

    const openHome = () => {
        setShowHome(true);
    }

    return(
        <>
            {showHome ? (
                <Home />
            ) : (
            <div className={styles.login}>
                <Logincard title="Faça seu login">
                    <form onSubmit={submitForm} className={styles.form} action="">
                        <input 
                            className={styles.input} 
                            type="text"  
                            name="email" id="" 
                            placeholder="email" 
                            value={userdata.email}
                            onChange={(e)=>{updateForm(e,'email')}}
                            required/>
                        <input 
                        className={styles.input} 
                        type="text" 
                        name="senha" id="" 
                        placeholder="senha" 
                        value={userdata.senha} 
                        onChange={(e)=>{updateForm(e,'senha')}}
                        required/>
                        {showAlert ? ( <p className={styles.p}>SENHA ERRADA!</p> ):(<p></p>)} 
                        <button className={styles.button}>Login</button>
                    </form>
                </Logincard>   
            </div>              
                )}      
        </>
    )
}