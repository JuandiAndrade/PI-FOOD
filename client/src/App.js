import './App.module.css';
import { Routes, Route, useLocation } from "react-router-dom";
import React from 'react';
import LandingPage from './components/LandinPage';
import Home from './components/Home';
import Detail from './components/Detail';
import Create from './components/Create';
import NavBar from './components/NavBar';


function App() {
  const location = useLocation()
  return (
    <div className="App">
      {location.pathname !== "/recipes" && location.pathname !== "/" ? <NavBar /> : null}
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/recipes' element={<Create />} />
        <Route path='/home/:id' element={<Detail />} />
      </Routes>
    </div>

  );
}

export default App;
