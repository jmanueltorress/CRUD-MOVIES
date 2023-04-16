import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const EditarResena = ({ match }) => {
  const URL = 'https://team-14-backend-production.up.railway.app';
  const id = match.params.id;

  const [resena, setResena] = useState({
    nombre_usuario: "",
    apellido_usuario: "",
    titulo_pelicula: "",
    comentario: ""
  });

  useEffect(() => {
    obtenerResena();
  }, []);

  const obtenerResena = () => {
    axios.get(`${URL}/resenas/${id}`)
      .then(response => {
        setResena(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const actualizarResena = () => {
    axios.patch(`${URL}/resenas/${id}`, resena)
      .then(response => {
        mostrarNotificacion('Reseña actualizada', 'success');
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
          name="nombre_usuario"
          value={resena.nombre_usuario}
          onChange={handleChange}
        />
        <input
          type="text"
          name="apellido_usuario"
          value={resena.apellido_usuario}
          onChange={handleChange}
        />
        <input
          type="text"
          name="titulo_pelicula"
          value={resena.titulo_pelicula}
          onChange={handleChange}
        />
        <textarea
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
