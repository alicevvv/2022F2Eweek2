import './App.css';
import React,{ BrowserRouter, Routes, Route } from "react-router-dom";
// component
import Start from './page/Start';


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Start/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
