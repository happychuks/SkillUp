import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const InstructorRegister =() =>{
  return (
    <div className="InstructorRegister">    
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>retype-Password</Form.Label>
            <Form.Control type="password" placeholder="retype Password" />
          </Form.Group>
          <Form.Select aria-label="Default select example">
                <option>select the category</option>
                <option value="1">Technical Skills</option>
                <option value="2">Vocational</option>
                <option value="3">Power Skills</option>
         </Form.Select>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
    </div>
  );
}

export default InstructorRegister;