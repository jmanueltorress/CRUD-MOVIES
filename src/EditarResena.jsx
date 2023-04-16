import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useParams } from 'react-router-dom';
const EditarResena = () => {
    const URL = 'https://team-14-backend-production.up.railway.app';
    const { id } = useParams();

    const [resena, setResena] = useState({});

    useEffect(() => {
        obtenerResena();
    }, []);

    const obtenerResena = () => {
        axios.get(`${URL}/resenas/${id}`)
            .then(response => {
                const [resena] = response.data;
                setResena(resena);

            })
            .catch(error => {
                console.log(error);
            });
    }

    const actualizarResena = () => {
        axios.patch(`${URL}/resenas/${id}`, resena)
            .then(response => {
                mostrarNotificacion('Reseña actualizada', 'success');
                console.log(response)
            })
            .catch(error => {
                mostrarNotificacion('Error al actualizar la reseña', 'error');
                console.log(error);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        actualizarResena();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResena({ ...resena, [name]: value });
    }
    
    const mostrarNotificacion = (message, type) => {
        if (type === 'success') {
            toast.success(message, {
                position: toast.POSITION.BOTTOM_CENTER
            });
        } else if (type === 'error') {
            toast.error(message, {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
    }

    return (
        <div>
            <h1>Editar reseña</h1>
            <form onSubmit={handleSubmit}>
                {/* Aquí puedes agregar campos de formulario para editar la reseña */}
                <input
                    type="text"
                    name="titulo"
                    value={resena.titulo}
                    onChange={handleChange}
                />

                <select data-te-select-init
                onChange={handleChange}
                id="puntuacion" name='puntuacion'
                value={resena.puntuacion}
                >
                    <option value="1">Uno</option>
                    <option value="2">Dos</option>
                    <option value="3">Tres</option>
                    <option value="4">Cuatro</option>
                    <option value="5">Cinco</option>
                </select>

                <input
                    type="text"
                    name="comentario"
                    value={resena.comentario}
                    onChange={handleChange}
                />

                <button type="submit">Guardar cambios</button>
            </form>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
}
export default EditarResena;