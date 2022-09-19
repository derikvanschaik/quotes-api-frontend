import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Spinner from 'react-bootstrap/Spinner';
import {useState} from 'react';
import AuthorsAccordion from './AuthorsAccordion';
import NavComponent from './NavComponent';
import SearchType from './SearchType';
import APP from '../enums/enum'

function AuthorSearch() {
    const [authors, setAuthors] = useState([]);
    const [authorsToQuotes, setAuthorsToQuotes] = useState({});
    const [searchInput, setSearchInput] = useState('');
    const [displayError, setDisplayError] = useState(false);
    const [justSearched, setJustSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleInput = (value) =>{
        setDisplayError(false);
        setSearchInput(value);
        setJustSearched(false);
    }
    const handleSearch = () =>{
        if(searchInput === ''){
            setDisplayError(true);
            return;
        }
        setIsLoading(true);
        fetch(`${APP.BASE_URL}/search/${searchInput}`, {mode: 'cors'})
        .then(resp => resp.json())
        .then((data) => {
            const authors = [];
            const authorsToQuotes = {};
            for(const {author, quotes} of data['authors']){
                authors.push(author);
                authorsToQuotes[author] = quotes;
            }
            setAuthorsToQuotes(authorsToQuotes);
            setAuthors(authors);
            setJustSearched(true);
            setIsLoading(false);
        });
    }
    return (
      <>
      <NavComponent includeHome={true}/>
      <Container>
          <SearchType />
          <Stack gap={5}>
            <Row className='text-center'>
                <Form>
                    <Stack gap={3}>
                        <Form.Group>
                            <Form.Control 
                                type="text" 
                                placeholder="Search Author" 
                                onInput={(e) => handleInput(e.target.value)} 
                            />
                            {displayError && <Alert variant='danger'>
                                Field cannot be blank
                            </Alert>}
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={handleSearch}>
                            Search
                        </Button>
                    </Stack>
                </Form>
            </Row>
            <Row>
                {isLoading &&
                    <Spinner animation="border" role="status" className="text-center">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                }
                {authors.length > 0 && <AuthorsAccordion authors={authors} authorsToQuotes={authorsToQuotes}/>}
                {
                    authors.length == 0 &&
                    justSearched === true &&
                    <Alert variant="secondary">
                        <Alert.Heading><h3>Not Found :(</h3></Alert.Heading>
                        <p>
                        Aw man! We couldnt find any authors matching that search. This search algorithm 
                        is not super sophisticated like the ones you are used to on a daily basis! It's very simple and 
                        depends on the accuracy of the characters of the input you gave us...
                        </p>
                        <h3>Suggestions:</h3>
                        <ol>
                            <li>
                                Try searching your author only by first or last name..
                            </li>
                            <li>
                                Verify the accuracy of the author's name with a google search.
                            </li>
                        </ol>
                        <p>If the above suggestions don't work then maybe we don't have any quotes for that author!</p>
                  </Alert>
                }
            </Row>
          </Stack>
      </Container>
      </>
    );
  }
  
  export default AuthorSearch;
  