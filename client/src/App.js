import './App.css';
import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Login from './pages/Login';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/home' element={ <HomePage /> } />
          <Route path='/' element={ <Login /> } />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
