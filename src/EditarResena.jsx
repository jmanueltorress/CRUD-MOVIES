import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useParams } from 'react-router-dom';
import EstrellasRating from './EstrellasRating';

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
      <div className="container mx-auto shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mt-4 p-6">
      <h1 className='text-xl font-bold'>Editar reseña</h1>
         
            <form onSubmit={handleSubmit} className='pt-4'>
                {/* Aquí puedes agregar campos de formulario para editar la reseña */}
                <div className="mb-6">
                <label htmlFor="titulo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Titulo</label>
                <input
                    type="text"
                    name="titulo"
                    value={resena.titulo}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                </div>

                <div className="mb-6">
                <label htmlFor="puntuacion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Puntuacion</label>
                <select data-te-select-init
                onChange={handleChange}
                id="puntuacion" name='puntuacion'
                value={resena.puntuacion}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="1">Uno</option>
                    <option value="2">Dos</option>
                    <option value="3">Tres</option>
                    <option value="4">Cuatro</option>
                    <option value="5">Cinco</option>
                </select>
                <EstrellasRating numero={resena.puntuacion}/>
                </div>

                <div className="mb-6">
                <label htmlFor="comentario" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Comentario</label>
                <textarea
                    type="text"
                    name="comentario"
                    value={resena.comentario}
                    onChange={handleChange}
                    id="comentario"  rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Deja un comentario..."
                />
                </div>
     
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar cambios</button>
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
