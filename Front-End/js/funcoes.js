export async function getPacientes(){
    const url = 'http://localhost:8080/v1/vital/usuario '
    const response = await fetch(url)
    const data = await response.json()
    return data.cliente
 }

 export async function postPaciente (cliente) {
    const url = 'http://localhost:8080/v1/vital/usuario'
    const options = {
       method: 'POST',
       headers: {
          'Content-Type': 'application/json'
       },
       body: JSON.stringify (cliente)
    }
    const response = await fetch (url, options)
 
    return response.ok
 }
