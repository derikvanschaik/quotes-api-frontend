import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import AuthorsAccordion from './components/AuthorsAccordion';
import AuthorsPagination from './components/AuthorsPagination';
import NavComponent from './components/NavComponent';

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
    <>
      <NavComponent includeSearch={true}/>
      <Container>
          <Stack gap={4} className='text-center'>
            <h1>Authors</h1>
            <AuthorsPagination 
              authors={authors} 
              active={activePage} 
              authorsPerPage={authorsPerPage}
              handleClick={handlePageChange}
            />
            <AuthorsAccordion authors={displayedAuthors} authorsToQuotes={authorsToQuotes}/>
          </Stack>
      </Container>
    </>
  );
}

export default App;
