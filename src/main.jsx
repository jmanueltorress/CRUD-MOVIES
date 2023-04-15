import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NavBar from './NavBar';
import Peliculas from './Peliculas';
import Resenas from './Resenas';
import Categorias from './Categorias';
import CrearPelicula from './CrearPelicula';
import EditarPelicula from './EditarPelicula';
import CrearCategoria from './CrearCategoria';
import EditarCategoria from './EditarCategoria';
import CrearResena from './CrearResena';
import EditarResena from './EditarResena';

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      {
        path: "/peliculas",
        element: <Peliculas />,
      },
      {
        path: "/peliculas/crear",
        element: <CrearPelicula/>
      },
      {
        path: "/peliculas/:id",
        element: <EditarPelicula/>
      },
      {
        path: "/categorias",
        element: <Categorias />,
      },
      {
        path: "/categorias/crear",
        element: <CrearCategoria/>
      },
      
      {
        path: "/categorias/:id",
        element: <EditarCategoria/>
      },
      {
        path: "/resenas",
        element: <Resenas />,
      },
      {
        path: "/resenas/crear",
        element: <CrearResena/>,
      },
      {
        path: "/resenas/:id",
        element: <EditarResena/>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />

  </React.StrictMode>,
)
