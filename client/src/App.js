import './App.css';
import { Route, Routes } from 'react-router-dom';
import React, {useState} from 'react';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import CreateUser from './pages/CreateUser';
import Preferences from './pages/Preferences';

import useToken from './useToken';

import Header from './components/Header';
import Footer from './components/Footer';



function App() {

  const { token, setToken } = useToken()

  if (!token) {
    return (
      <>
        <main>
          <Routes>
            <Route path='/' element={ <Login setToken={setToken} /> } />
            <Route path='/create-user' element={ <CreateUser /> } />
          </Routes>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={ <HomePage /> } />
          <Route path='/preferences' element={ <Preferences /> }></Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
