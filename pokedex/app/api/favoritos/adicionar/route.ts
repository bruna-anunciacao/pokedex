import { NextResponse } from "next/server";
import { prisma } from "../../../utilis/prisma";

export async function POST(req: Request){
    const {method} = req
    const res = NextResponse
    const{userEmail, pokeid} =  await req.json()
    if(method ==='POST'){
        try{
            const favs = await prisma.poke.create({data:{
                userEmail:userEmail,
                num:pokeid
            }, include:{
                user:true
            }})
            return res.json(favs,{status:201})
        }
        catch(e){
            console.log(e)
            return res.json({message:'algo deu errado'},{status:500})
        }
        finally{
            await prisma.$disconnect()
        }
        
    }else{
        return res.json({message:'metodo errado'})
    }
}