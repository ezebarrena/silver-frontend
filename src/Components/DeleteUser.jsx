import '../App.css';
import React, { useState, useEffect } from 'react';


function DeleteUser() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    
    const [users, setUsers] =useState([]);
    
    const [selectedUser, setSelectedUser] = useState('');
    
    

    useEffect(() => {
        // Llamada a la API para obtener la lista de ocupaciones
        fetch('http://localhost:8080/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error al obtener ocupaciones:', error));
    }, []);

    const vaciarCampos = () => {
        setFirstName('');
        setLastName('');
        setAge('');
        setSelectedUser('');
    };
    
    const handleSubmit = () => {
        const empleado = {
            firstName,
            lastName,
            age,
            occupationId: parseInt(selectedUser, 10),
        };
        console.log(empleado);

        // Realizar la solicitud POST al backend
        fetch(`http://localhost:8080/users/delete/${selectedUser}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(empleado),
        })
            .then(response => response.text())
            .then(data => {
                console.log('Respuesta del servidor:', data);
                // Manejar la respuesta del servidor si es necesario
            })
            .catch(error => {
                console.error('Error al enviar datos al servidor:', error);
            });
        console.log(selectedUser)
        alert("usuario creado")
        vaciarCampos();
        
    };


    
    return (
        <div>
        <div className='container'>
            <h1 className='Titulo'>Eliminar usuario</h1>
            <div>
                <label className='label'>Usuario:</label>
                <select className='input' value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                    <option value="" disabled>Selecciona un usuario</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.first_name + " " + user.last_name}
                        </option>
                    ))}
                </select>
            </div>
            
            
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button type="button" class="btn btn-success" onClick={handleSubmit}>Eliminar</button>
            </div>
        </div>
        </div>
    )
}

export default DeleteUser