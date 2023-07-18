import { prisma } from "../../../utilis/prisma";
import { NextResponse } from "next/server";

//a rota na verdade é um post porque as dinamics routs não tão funcionando
export async function POST(req: Request) {
    const res = NextResponse
    const {email,pokeid} = await req.json()
    try{
        const favs = await prisma.poke.deleteMany({
        where:{
            userEmail:email,
            num:pokeid
        }
        })
        const updatedfavs = await prisma.user.findUnique({
            where:{
                email: email
            }, include:{
                favs:true
            }
        })
        //retorna o usuário atualizado
        return res.json(updatedfavs)
        
    }catch(e){
        console.log(e)
    }finally{
        await prisma.$disconnect()
    }
}
