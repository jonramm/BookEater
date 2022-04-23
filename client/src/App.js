import './App.css';
import { Route, Routes } from 'react-router-dom';
import React, {useState} from 'react';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import CreateUser from './pages/CreateUser';
import Profile from './pages/Profile';
import BookReports from './pages/BookReports';
import Bookshelf from './pages/Bookshelf';

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
          <Route path='/login' element={ <Login /> } />
          <Route path='/profile' element={ <Profile /> }></Route>
          <Route path='/bookshelf' element={ <Bookshelf /> } />
          <Route path='/bookreports' element={ <BookReports /> } />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
