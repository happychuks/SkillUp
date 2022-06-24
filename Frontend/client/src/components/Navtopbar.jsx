import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/esm/Button';

function Navtopbar() {
  return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">SkillUp</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="/Login">Login</Nav.Link>
            <Nav.Link href="/Register">Register</Nav.Link>

            <NavDropdown title="Courses" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/uploaded/3.1">IT & Software</NavDropdown.Item>
              <NavDropdown.Item href="uploaded/3.2">
                Power Skill
              </NavDropdown.Item>
              <NavDropdown.Item href="uploaded/3.3">Vocational Skills</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="uploaded/3.4">
                Blog
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Form inline>
              <Form.Control type="text" placeholder="Search" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
    
  );
}

export default Navtopbar;