import { useState, useEffect } from 'react';

function GetUsers () {
    const [tablaUsuarios, setTablaUsuarios] = useState();
    const [data, setData] = useState(null);
    const accessToken = sessionStorage.getItem('access-token')

    const obtenerUsuarios = async () => {
        try {
            
            console.log('entre al back')
            let url = 'http://localhost:8080/users'
            console.log('copie url')
            let response = await fetch(url, {
                method: 'GET',
                mode: "cors",
                headers: {
                    'Origin': 'http://localhost:3000/'
                },
            
            })
            console.log("sigo en el try")
            const data = await response.json(); // Obtener los datos en formato JSON
            console.log(data); // Mostrar los datos en la consola
        
            const filas = data.map(usuario => (
                <tr key={usuario.id}>
                    <td>{usuario.first_name}</td>
                    <td>{usuario.last_name}</td>
                    <td>{usuario.age}</td>
                    <td>{usuario.occupation}</td>
                </tr>
            ));
        //setTablaMensaje(filas)
        //return data;
            setTablaUsuarios(filas);
    } catch (error) {
            console.log("Error", error);
    }}

    useEffect(() => {
        obtenerUsuarios(setData,accessToken);
    },[setData,accessToken]);
    return(
        <div>
            <div className="container">
            <h1 className='Titulo'>Traer usuarios</h1>         
                <div className="BoxAdmin">
                    <div className="boxTabla">
                        <table class="table table-stripped" id="tablaAdmin">

                            <thead className="cabezeraTabla">
                                <tr>
                                    <th id="campoCabezera1">Nombre</th>
                                    <th id="campoCabezera2">Apellido</th>
                                    <th id="campoCabezera3">Edad</th>
                                    <th id="campoCabezera4">Ocupacion</th>
                                </tr>
                            </thead>

                            <tbody className="filasTabla">
                                {tablaUsuarios}
                            </tbody>     
                        </table>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default GetUsers;