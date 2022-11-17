import './App.css';
import React,{ BrowserRouter, Routes, Route } from "react-router-dom";
// component
import Home from './page/Home';
import Login from './page/Login';
import Signup from './page/Signup';
import File from './page/File'


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/file" element={<File/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
