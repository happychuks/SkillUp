import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; 
import Homepage from "./pages/Homepage";
import StudentDashboardPage from './pages/StudentDashboardPage';
import Register from "./pages/Register"; 
import InstructorRegister from "./pages/InstructorRegister";
import InstructorLogin from "./pages/InstructorLogin";
import Navtopbar from './components/Navtopbar';
import header from './components/header';
import InstructorDashboardPage from './pages/InstructorDashboardPage';



const App = () => {

  const [user, setUser] = useState ({
//    email: "as@gmail.com" 
  }) 

  const setEmail = (event) => {
    return ( 
      setUser({...user, email: event.target.value})
     );
  }
   
  

  // const [token, setToken] = useHref();
  // if(!token) {
  //   return <Login setToken={setToken} />
  // }
  return (
    <div className='App'>


      
     <>
      <Navtopbar user={user?.email}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Homepage />} />

          <Route path="/Login" exact element={<Login setEmail={setEmail}/>} />
          <Route path="/InstructorLogin" exact element={<InstructorLogin />} />

          <Route path="/InstructorRegister" exact element={<InstructorRegister/>} />
          <Route path="/Register" exact element={<Register/>} />
          <Route path="/Instructor" exact element={<InstructorDashboardPage />} />
          <Route path="/Student" exact element={<StudentDashboardPage/>}{...<Login/>} />
        </Routes>
      </BrowserRouter>
      </>
    </div>
  );
}

export default App;
