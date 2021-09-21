const Display=({isLoged,setIsLoged})=>{
    return isLoged ?(
        <p style={{color:"green"}}>Requisição Completa!</p>):(
        <p style={{color:"red"}}>Requisição Falhou!</p>)
}
export default Display