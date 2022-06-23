import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { 
  Link 
  } from "react-router-dom";

  export default function Login({ setToken }) {
      
  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
    <form>
      <label>
        <p>Username</p>
        <input type="text" />
      </label>
      <label>
        <p>Password</p>
        <input type="password" />
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
      <p> <Link to='/InstructorLogin'>Are you an Instructor?</Link></p>
          <p>Don't have an account? click <Link to='/Register'>here</Link></p>
    </form>
    </div>
  )
 
}; 
// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// }
       
    

