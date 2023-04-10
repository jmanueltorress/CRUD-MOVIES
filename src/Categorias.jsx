import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Categorias = () => {
    const URL = 'https://team-14-backend-production.up.railway.app/categorias'
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        fetch(URL).then(blob => blob.json()).then(data => setCategorias(data))
    }, [])

    return (
        <div className="container mx-auto shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mt-4">
            <div className="flex justify-between items-center">
                <h1 className='text-xl font-bold'>Categorias</h1>

                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        <div className="flex items-center gap-2">
                            <box-icon color="white" name='plus-circle'></box-icon>
                            <span>Nueva categoria</span>
                        </div>
                    </button>

            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Nombre Categoria
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Descripcion
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categorias.map(categoria => {
                                return (
                                    <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {categoria.nombre}
                                        </th>
                                        <td class="px-6 py-4">
                                            {categoria.descripcion}
                                        </td>
                                        <td className="px-6 py-4 flex">
                                            <div ><Link ><box-icon animation='tada-hover' color="#244ED8" name='edit'></box-icon></Link></div>
                                            <div className='inline' ><box-icon animation='tada-hover' color="#FF6B6B" name='trash' ></box-icon></div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Categorias
