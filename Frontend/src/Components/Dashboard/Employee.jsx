import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Employee = () => {

  // LISTAR A TODOS LOS EMPLEADOS
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // BORRAR A UN EMPLEADO
  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_employee/'+id)
    .then(result => {
        if(result.data.Status) {
            window.location.reload()
        } else {
            alert(result.data.Error)
        }
    })
  } 

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Listado de Empleados</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Añadir Empleados
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Imagen</th>
              <th>Email</th>
              <th>Direccion</th>
              <th>Salario</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>
                  <img
                    /* La ruta donde esta guardado la imgaen en el backend */
                    src={`http://localhost:3000/Images/` + e.image}
                    className="employee_image"
                  />
                </td>
                <td>{e.email}</td>
                <td>{e.address}</td>
                <td>{e.salary}</td>
                <td>
                  <Link
                    to={`/dashboard/edit_employee/` + e.id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;