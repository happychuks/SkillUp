import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; 
import Homepage from "./pages/Homepage";
import DashboardPage from './pages/DashboardPage';
import Register from "./pages/Register"; 
import InstructorRegister from "./pages/InstructorRegister";
import InstructorLogin from "./pages/InstructorLogin";


function App() {
  // const [token, setToken] = useHref();
  // if(!token) {
  //   return <Login setToken={setToken} />
  // }
  return (
    <div className='App'>
      <h1> Credo </h1>
     
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/InstructorLogin" element={<InstructorLogin />} />
          <Route path="/InstructorRegister" element={<InstructorRegister/>} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/DashboardPage" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
