import React, {Component} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import { 
  Link 
  } from "react-router-dom";
  import "../styles/Login.css"

function Login({ setToken, setEmail }) {
      
  return(
    <div className="login-wrapper" >
      <h1>Please Log In</h1>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        
        <Form.Control onChange={(event)=>setEmail(event)} type="email" placeholder="Enter email" />
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
          </Form.Group>
          </Form>

      
        <button type="submit" >Submit</button>
      
      

      <p> <Link to='/InstructorLogin'>Are you an Instructor?</Link></p>
          <p>Don't have an account? click <Link to='/Register'>here</Link></p>
    

    </div>
    
  )
 
}; 
// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// }
       
    
export default Login;
