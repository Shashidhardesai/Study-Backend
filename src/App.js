import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrontPage from './FrontPage';
import HomePage from './HomePage';
import Login from './Login'
import Journey from './Courses/Journey';
import Navbar from './Courses/Navbar';
import Webdev from './Courses/Webdev';
import Machine from './Courses/Machine';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/frontpage" element={<FrontPage/>}/>
        <Route path="/navbar" element={<Navbar/>}/>
        <Route path="/journey" element={<Journey/>}/>
        <Route path="/webdev" element={<Webdev/>}/>
        <Route path="/machine" element={<Machine/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
