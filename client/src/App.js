import { Route, Routes } from 'react-router-dom';
import react, { useState } from 'react'
import './App.css';
import Login from './pages/Login'
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import SeeAllUsers from './pages/SeeAllUsers';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import Missing from './pages/Missing';
import Unauthorized from './pages/Unauthorized';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* Public Routes */}
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='unauthorized' element={<Unauthorized />} />
        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path='/' element={<HomePage />} />
          <Route path='users' element={<SeeAllUsers />} />
        </Route>
        {/* Catch All */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>

  )
}

export default App;
