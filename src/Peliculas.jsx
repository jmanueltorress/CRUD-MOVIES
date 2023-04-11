import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import 'boxicons'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";





const Peliculas = () => {
    const URL = 'https://team-14-backend-production.up.railway.app/peliculas'

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

    const traerDatos = () => {
        axios.get(URL).then(response => setPeliculas(response.data));
    }

    const [peliculas, setPeliculas] = useState([])
    useEffect(() => {
        traerDatos();
    }, [])

    const eliminarPelicula = (id) => {

        axios.delete(`https://team-14-backend-production.up.railway.app/peliculas/${id}`)
            .then(response => {
                mostrarNotificacion('Pelicula eliminada', 'success')
                traerDatos()
                console.log(response.data); // Aquí puedes manejar la respuesta del servidor
            })
            .catch(error => {
                mostrarNotificacion('Error al eliminar la pelicula', 'error')
                console.log(error); // Aquí puedes manejar el error en caso de que ocurra
            });


    }
    return (

        <div className="container mx-auto shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mt-4">

            <div className="flex justify-between items-center">
                <h1 className='text-xl font-bold'>Peliculas</h1>
                <Link to="crear">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        <div className="flex items-center gap-2">
                            <box-icon color="white" name='plus-circle'></box-icon>
                            <span>Nueva pelicula</span>
                        </div>
                    </button>
                </Link>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Titulo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Año
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Sinopsis
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Categorias
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {peliculas.map(pelicula => {
                            return (
                                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {pelicula.titulo}
                                    </th>
                                    <td className="px-6 py-4">
                                        {pelicula.anio}
                                    </td>
                                    <td className="px-6 py-4">
                                        {pelicula.sinopsis}
                                    </td>
                                    <td className="px-6 py-4">
                                        {pelicula.categorias.join(' - ')}
                                    </td>
                                    <td className="px-6 py-4 flex">
                                        <div ><Link to={`/peliculas/${pelicula.id_pelicula}`}><box-icon animation='tada-hover' color="#244ED8" name='edit'></box-icon></Link></div>
                                        <div className='inline' onClick={() => { eliminarPelicula(pelicula.id_pelicula) }}><box-icon animation='tada-hover' color="#FF6B6B" name='trash' ></box-icon></div>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
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

export default Peliculas
