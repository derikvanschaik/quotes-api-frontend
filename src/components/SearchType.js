import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from "react-router-dom";

function SearchType() {
  const navigate = useNavigate();
  return (
    <Dropdown style={{margin: '2em 0'}}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
        Search Type
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#" onClick={() => navigate('/search')}>Author</Dropdown.Item>
          <Dropdown.Item href="#" onClick={()=> navigate('/keyword-search')}>Keyword</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
  );
}

export default SearchType;