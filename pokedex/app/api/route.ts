import { prisma } from "../utilis/prisma"
import { NextResponse } from "next/server"
import Tokenhandlers from "../utilis/jwt"

//por algum motivo não estou conseguindo chamar os tipos
export async function POST(req:Request){
    const res = NextResponse
    const {method} = req
    const {email,senha} = await req.json()
    if (method ==='POST') {
        
            try{
                console.log(method)
                
                //checa se a string está vazia
                if(( email !=='' && senha!=='' ) || (email !== undefined && senha!== undefined)){
                    //procura um usuário ja existente
                    const user = await prisma.user.findUnique({
                        where:{
                        email:email
                    }})
                    //checa se o usuário não existe
                    if(!user){
                        //caso não exista cria-se um novo usuário
                        const newuser = await prisma.user.create({
                            data:{
                                email: email,
                                password:senha
                            }
                        })
                        const token = Tokenhandlers.createToken(email)
                        console.log(token)
                        return res.json(token,{status:201})
                    //se o usuário existe
                    }else{
                        //checa se a senha enviada não corresponde à registrada
                        if (user.password != senha){
                            //se não corresponde envia um erro genérico
                            return res.json({message:'Usuário ou senha errados'},{status: 401})
                        }else{
                            const token = Tokenhandlers.createToken(email)
                            return  res.json(token)
                        }
                    }
                    
                }else{
                    return res.json({message:"campo vazio"},{status:400})
                }

                
            }catch(e){
                console.log(e)
                return

            }finally{
                await prisma.$disconnect()
            }
    }else{
        return res.json({message:"metodo errado"},{status:404})
    }
    


}