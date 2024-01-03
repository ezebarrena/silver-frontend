const postUser = async (firstName, lastName, age, occupationId) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type","application/json");

    var raw = JSON.stringify({
        "firstName":firstName,
        "lastName":lastName,
        "age": age,
        "occupationId": occupationId
      });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        mode:'cors'
    };

    let response = await fetch("http://localhost:8080/save", requestOptions).then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
        // Manejar la respuesta del servidor si es necesario
    })
    .catch(error => {
        console.error('Error al enviar datos al servidor:', error);
    });
    
      

}

export default postUser;