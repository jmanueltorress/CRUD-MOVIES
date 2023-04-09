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
        path: "/categorias",
        element: <Categorias />,
      },
      {
        path: "/resenas",
        element: <Resenas />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />

  </React.StrictMode>,
)
