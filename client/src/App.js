import './App.css';
import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={ <HomePage /> } />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
