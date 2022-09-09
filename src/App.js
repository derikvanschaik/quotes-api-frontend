import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useEffect, useState} from 'react';
import AuthorsAccordion from './components/AuthorsAccordion';
import AuthorsPagination from './components/AuthorsPagination';

function App() {
  const [authors, setAuthors] = useState([]);
  const [authorsToQuotes, setAuthorsToQuotes] = useState({});
  const [displayedAuthors, setDisplayedAuthors] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const authorsPerPage = 50;
  
  useEffect( () =>{
    fetch("https://enhanced-type-fit.herokuapp.com/", {mode: 'cors'})
    .then(resp => resp.json())
    .then((data) => {
      setAuthorsToQuotes(data);
      const authors = Array.from(Object.keys(data));
      setAuthors(authors);
      setDisplayedAuthors(authors.slice(activePage - 1, activePage - 1 + authorsPerPage));
    });

  }, []);

  const handlePageChange = (pageNumber) =>{
    setActivePage(pageNumber);
    const start = (pageNumber - 1)*authorsPerPage;
    const end = start + authorsPerPage;
    setDisplayedAuthors(authors.slice(start, end));
  }

  return (
    <Container>
      <div>
        <Row className='text-center'>
          <h1>Authors</h1>
          <AuthorsPagination 
            authors={authors} 
            active={activePage} 
            authorsPerPage={authorsPerPage}
            handleClick={handlePageChange}
          />
        </Row>
        <Row>
          <Col>
            <AuthorsAccordion authors={displayedAuthors} authorsToQuotes={authorsToQuotes}/>
          </Col>
        </Row>

      </div>
    </Container>
  );
}

export default App;
