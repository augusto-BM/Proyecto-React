import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const EmployeeDetail = () => {

    const navigate = useNavigate()

    //RECUPERAMOS EL ID ENVIADO POR EL LINK AL LOGUEARSE
    const {id} = useParams()
    
    //LISTAR LOS DATOS DEL EMPLEADO LOGUEADO
    const [employee, setEmployee] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/employee/detail/'+id)
        .then(result => {
            //console.log(result.data)
            setEmployee(result.data[0])
        })
        .catch(err => console.log(err))
    }, [])

    //PARA CERRAR LA SESION
    const handleLogout = () => {
        axios.get('http://localhost:3000/employee/logout')
        .then(result => {
          if(result.data.Status) {
            localStorage.removeItem("valid")
            navigate('/')
          }
        }).catch(err => console.log(err))
      }

  return (
    <div>
        <div className="p-2 d-flex justify-content-center shadow">
            <h4>Sistema de gestión de empleados</h4>
        </div>
        <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
            <img src={`http://localhost:3000/Images/`+employee.image} className='emp_det_image'/>
            <div className='d-flex align-items-center flex-column mt-5'>
                <h3>Nombre: {employee.name}</h3>
                <h3>Correo: {employee.email}</h3>
                <h3>Salario: ${employee.salary}</h3>
            </div>
            <div>
                <button className='btn btn-primary me-2'>Editar</button>
                <button className='btn btn-danger' onClick={handleLogout}>Cerrar Sesion</button>
            </div>
        </div>
    </div>
  )
}

export default EmployeeDetail