import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

function NavComponent({includeHome, includeSearch}) {
  return (
    <Navbar bg="light">
      <Container fluid>
      <Nav
            className="me-auto"
          >
            {
                includeHome && 
                <Nav.Link href="#action1"><Link to="/" className='btn btn-outline-primary' data-testid='nav-text-1'>Home</Link></Nav.Link>

            }
            {
                includeSearch && 
                <Nav.Link href="#action1"><Link to="/search" className='btn btn-outline-primary' data-testid='nav-text-2'>Search</Link></Nav.Link>
            }
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavComponent;