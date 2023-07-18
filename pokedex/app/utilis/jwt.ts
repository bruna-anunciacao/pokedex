import {sign, verify} from "jsonwebtoken";
import { KEY } from "./key";


class Tokenhandlers{
    static createToken(email:string){
    
        return sign({email:email},KEY)
    
    }

    static readToken(token:string){

        try{
            console.log("tentei")
            console.log(verify(token, KEY))
            return verify(token,KEY)
        }catch(e){
        console.log(e) 
        }
        
    }

}

export default Tokenhandlers




