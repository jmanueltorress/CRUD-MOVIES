import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import EstrellasRating from './EstrellasRating';


const CrearResena = () => {
    const URL = 'https://team-14-backend-production.up.railway.app'
    const submitHandler = (e) => {
        e.preventDefault();
        enviarResena();
    }

    const [resena, setResena] = useState({
        id_usuario: "",
        id_pelicula: "",
        titulo: "",
        puntuacion: 1,
        comentario: ""
    });



    const [peliculas, setPeliculas] = useState([])
    const [usuarios, setUsuarios] = useState([])

    const traerPeliculas = () => {
        axios.get(`${URL}/peliculas`).then(response => setPeliculas(response.data));
    }

    const traerUsuarios = () => {
        axios.get(`${URL}/usuarios`).then(response => setUsuarios(response.data));
    }

    const enviarResena = () => {
        axios.post(`${URL}/resenas`, resena)
          .then(response => {
            mostrarNotificacion('Resena registrada', 'success')
            console.log(response)
          })
          .catch(error => {
            mostrarNotificacion('No fue posible registrar la reseña', 'error')
            console.log(error)
          });
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


    useEffect(() => {
        traerPeliculas();
        traerUsuarios();
    }, [])



    return (
        <div className="container mx-auto shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mt-4 p-6">
            <h1 className='text-xl font-bold'>Crear reseña</h1>
            <form className='pt-4' onSubmit={submitHandler}>
                <div className="mb-6">
                    <label htmlFor="id_usuario" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Usuario</label>

                    <select id="id_usuario" name='id_usuario' onChange={(e) => setResena({ ...resena, id_usuario: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        <option value="" selected>Selecciona un usuario</option>
                        {usuarios.map((usuario) => {
                            return (
                                <option value={usuario.id_usuario} >{usuario.nombres} {usuario.apellidos}</option>
                            )
                        })}
                    </select>

                </div>
                <div className="mb-6">
                    <label htmlFor="id_pelicula" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Pelicula</label>
                    <select id="id_pelicula" name='id_pelicula' onChange={(e) => setResena({ ...resena, id_pelicula: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    <option value="" selected>Selecciona una pelicula</option>
                        {peliculas.map(pelicula => {
                            return (
                                <option value={pelicula.id_pelicula}>{pelicula.titulo}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="titulo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Titulo</label>
                    <input type="text" id="titulo" name="titulo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Titulo reseña" required
                        onChange={(e) => setResena({ ...resena, titulo: e.target.value })} ></input>
                </div>
                <div className="mb-6">
                    <label htmlFor="puntuacion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Puntuacion</label>
                    <select data-te-select-init onChange={(e) => setResena({ ...resena, puntuacion: e.target.value })} id="puntuacion" name='puntuacion'>
                        <option value="1">Uno</option>
                        <option value="2">Dos</option>
                        <option value="3">Tres</option>
                        <option value="4">Cuatro</option>
                        <option value="5">Cinco</option>
                    </select>

                    <EstrellasRating numero={resena.puntuacion}></EstrellasRating>
                </div>
                <div className="mb-6">
                    <label htmlFor="comentario" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Comentario</label>
                    <textarea id="comentario" name="comentario" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Deja un comentario..."
                        onChange={(e) => setResena({ ...resena, comentario: e.target.value })} required></textarea>
                </div>


                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar</button>
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
    )
}

export default CrearResena
