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
import TestLinks from './pages/TestLinks';

const ROLES = {
  'admin': 1,
  'editor': 2,
  'user': 3
}

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>

        {/* Public Routes */}
        <Route path='links' element={<TestLinks />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='unauthorized' element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.editor, ROLES.user]} />}>
            <Route path='/' element={<HomePage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
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
