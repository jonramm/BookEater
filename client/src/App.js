import { Route, Routes } from 'react-router-dom';
import react, { useState } from 'react'
import './App.css';
import Login from './pages/Login'
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import SeeAllUsers from './pages/SeeAllUsers';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import Layout from './components/Layout';
import Missing from './pages/Missing';
import Unauthorized from './pages/Unauthorized';
import Library from './pages/Library';
import AddReport from './pages/AddReport';
import Preferences from './pages/Preferences';
import LandingPage from './pages/LandingPage';
import Success from './pages/Success';
// import "bootstrap/dist/css/bootstrap.min.css";

const ROLES = {
  'admin': 1,
  'editor': 2,
  'user': 3
}

function App() {

  const [bookToEdit, setBookToEdit] = useState()
  const [brainShow, setBrainShow] = useState(false)
    const handleBrainClose = () => {
        setBrainShow(false)
    }

    const brainDisplay = () => {
        setBrainShow(true)
    }

  return (
    <Routes>
      <Route path='/' element={<Layout />}>

        {/* Public Routes */}
        <Route path='landing' element={<LandingPage />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='unauthorized' element={<Unauthorized />} />

        <Route path='/success' element={<Success />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.editor, ROLES.user]} />}>
            <Route path='/' element={<HomePage 
                                        setBookToEdit={setBookToEdit}
                                        brainShow={brainShow} 
                                        brainDisplay={brainDisplay} 
                                        handleBrainClose={handleBrainClose} />} /> 
            <Route path='/library' element={<Library 
                                                    setBookToEdit={setBookToEdit}
                                                    brainShow={brainShow} 
                                                    brainDisplay={brainDisplay} 
                                                    handleBrainClose={handleBrainClose}/>} />
            <Route path='/add-report' element={<AddReport bookToEdit={bookToEdit} />} />
            <Route path='/preferences' element={<Preferences />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.editor]} />}>
            <Route path='users' element={<SeeAllUsers />} />
          </Route>
        </Route>

        {/* Catch All */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>

  )
}

export default App;
