import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login'
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import SeeAllUsers from './pages/SeeAllUsers';
import RequireAuth from './components/RequireAuth';
import react, { useState } from 'react'

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/' element={ <HomePage /> } />

        <Route element={<RequireAuth />}> 
          <Route path='users' element={ <SeeAllUsers /> } />
        </Route>
      </Routes>
    </>
  );
}

export default App;
