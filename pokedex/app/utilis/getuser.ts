let email = ''

export function setemail (incomingemail:string){
    email = incomingemail
    console.log('função email')
    return console.log(email)
}
export function getemail(){
    console.log ('função de ler')
    return email
}
