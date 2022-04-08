import './App.css';
import './Signin.css'
import { Route, Routes } from 'react-router-dom';
import React, {useState} from 'react';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Preferences from './pages/Preferences';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  const [token, setToken] = useState()

  if (!token) {
    return (
      <>
        <Header />
          <main>
            <Login setToken={setToken}/>
          </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/home' element={ <HomePage /> } />
          <Route path='/preferences' element={ <Preferences /> }></Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
