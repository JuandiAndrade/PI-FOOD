import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import LandingPage from './components/LandinPage';
import Home from './components/Home';
import Detail from './components/Detail';
import Create from './components/Create';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/recipes' element={<Create />} />
          <Route path='/home/:id' element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
