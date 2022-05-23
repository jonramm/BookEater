import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login'
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import react, { useState } from 'react'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/home' element={ <HomePage /> } />
      </Routes>
    </>
  );
}

export default App;
