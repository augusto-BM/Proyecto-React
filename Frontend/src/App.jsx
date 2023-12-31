
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'

import AdminLogin from './Components/Principal/AdminLogin'
import EmployeeLogin from './Components/Principal/EmployeeLogin'
import EmployeeDetail from './Components/Dashboard/EmployeeDetail'

import Dashboard from './Components/Dashboard/Dashboard'
import Home from './Components/Dashboard/Home'
import Employee from './Components/Dashboard/Employee'
import Category from './Components/Dashboard/Category'
import Profile from './Components/Dashboard/Profile'
import AddCategory from './Components/Dashboard/AddCategory'
import AddEmployee from './Components/Dashboard/AddEmployee'
import EditEmployee from './Components/Dashboard/EditEmployee'
import Start from './Components/Principal/Start'

import PrivateRoute from './Components/PrivateRoute'


/*import PrivateRoute from './Components/PrivateRoute' */

function App() {

  return (
    <BrowserRouter>
    <Routes>

      <Route path='/' element={<Start />}></Route>

      <Route path='/admin_login' element={<AdminLogin />}></Route>
      <Route path='/employee_login' element={<EmployeeLogin />}></Route>
      <Route path='/employee_detail/:id' element={<EmployeeDetail/>}></Route>
      
      {/* <Route path='/dashboard' element={<Dashboard />}> */}
      <Route path='/dashboard' element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute> 
      }>
        <Route path='' element={<Home />}></Route>
        <Route path='/dashboard/employee' element={<Employee />}></Route>
        <Route path='/dashboard/category' element={<Category />}></Route>
        <Route path='/dashboard/profile' element={<Profile />}></Route>
        <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
        <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
        <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
