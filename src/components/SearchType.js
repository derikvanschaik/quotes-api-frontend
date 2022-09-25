import Dropdown from 'react-bootstrap/Dropdown';

function SearchType({changeSearchType}) {
  return (
    <Dropdown style={{margin: '2em 0'}}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
        Search Type
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#" onClick={() => changeSearchType('author')}>Author</Dropdown.Item>
          <Dropdown.Item href="#" onClick={()=> changeSearchType('keyword')}>Keyword</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
  );
}

export default SearchType;