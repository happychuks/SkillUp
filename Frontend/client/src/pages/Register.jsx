import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import "../styles/register.css"

function Register() {
    return (
      <div className="Register">    
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            
            <Form.Control type="password" placeholder="Retype Password" />
          </Form.Group>
          <Form.Select aria-label="Default select example">
                
                <option value="1">All Skills</option>
                <option value="2">IT Skills</option>
                <option value="3">Vocational Skills</option>
                <option value="4">Power Skills</option>
         </Form.Select>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          </Form>
         
      </div>
    );
  }
  
  export default Register;