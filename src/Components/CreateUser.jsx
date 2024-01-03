import '../App.css';
import React, { useState, useEffect } from 'react';


function CreateUser() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [occupations, setOccupations] = useState([]);
    const [selectedOccupation, setSelectedOccupation] = useState('');
    
    useEffect(() => {
        // Llamada a la API para obtener la lista de ocupaciones
        fetch('http://localhost:8080/occupations')
            .then(response => response.json())
            .then(data => setOccupations(data))
            .catch(error => console.error('Error al obtener ocupaciones:', error));
    }, []);
    
    const vaciarCampos = () => {
        setFirstName('');
        setLastName('');
        setAge('');
        setSelectedOccupation('');
    };
    
    const handleSubmit = () => {
        const empleado = {
            firstName,
            lastName,
            age,
            occupationId: parseInt(selectedOccupation, 10),
        };
        console.log(empleado);

        // Realizar la solicitud POST al backend
        fetch('http://localhost:8080/users', {
            method: 'POST',
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
        console.log(selectedOccupation)
        alert("usuario creado")
        vaciarCampos();
        window.location.reload();
    };


    
    return (
        <div>
        <div className='container'>
            <h1 className='Titulo'>Crear usuario</h1>
            <div>
                <label className='label'>Nombre:</label>
                <input className='input' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div>
                <label className='label'>Apellido:</label>
                <input className='input' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div>
                <label className='label'>Edad:</label>
                <input className='input' type="text" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div>
                <label className='label'>Ocupación:</label>
                <select className='input' value={selectedOccupation} onChange={(e) => setSelectedOccupation(e.target.value)}>
                    <option value="" disabled>Selecciona una ocupación</option>
                    {occupations.map(occupation => (
                        <option key={occupation.id} value={occupation.id}>
                            {occupation.occupation}
                        </option>
                    ))}
                </select>
            </div>
            
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button type="button" class="btn btn-warning" onClick={vaciarCampos}>Vaciar</button>
                <button type="button" class="btn btn-success" onClick={handleSubmit}>Crear</button>
            </div>
        </div>
        </div>
    )
}

export default CreateUser