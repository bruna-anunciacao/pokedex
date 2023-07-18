import { NextResponse } from "next/server";
import { prisma } from "../../../utilis/prisma";


export async function POST(req:Request){

    const {method}=req
    const {email}= await req.json()
    const res = NextResponse
    if(method === 'POST'){

        try{
        const favs = await prisma.user.findUnique({
            where:{
                email: email
            }, include:{
                favs:true
            }
        })
        return res.json(favs?.favs)
        }catch(e){
            console.log(e)
        }
        finally{
            await prisma.$disconnect()
        }

    }else{
        return res.json('metodo errado')

    }
}