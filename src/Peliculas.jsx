import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'



const Peliculas = () => {
    const URL = 'https://team-14-backend-production.up.railway.app/peliculas'

    const [peliculas, setPeliculas] = useState([])
    useEffect(() => {
        fetch(URL).then(blob => blob.json()).then(data => setPeliculas(data));
    }, [])


    return (
        <div>
            <div class="flex justify-end">
                <Link to="crear">
                <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Nueva pelicula
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
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Peliculas
