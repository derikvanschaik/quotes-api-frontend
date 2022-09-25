import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import {useState} from 'react';
import AuthorsAccordion from './AuthorsAccordion';
import NavComponent from './NavComponent';
import SearchType from './SearchType';
import APP from '../enums/enum'
import KeywordStack from './KeywordStack';
import QuoteswithKeywords from './QuoteswithKeywords';

function AuthorSearch() {
    const [keywords, setKeywords] = useState([]);
    const [resultsCount, setResultsCount] = useState(null);
    const [results, setResults] = useState([]); // changes type based on author or search type
    const [searchInput, setSearchInput] = useState('');
    // TODO: put this into an enum
    const [searchType, setSearchType] = useState('author'); // author || keyword

    const changeSearchType = (type) =>{
        if(type === searchType){
            return;
        }
        setSearchInput('');
        setKeywords([]);
        setResults([]);
        setResultsCount(null);
        setSearchType(type);
    }
    const handleAddKeyword = () =>{
        setKeywords([...keywords, searchInput]);
        setSearchInput('');
    }
    const handleRemoveKeyword = (idx) =>{
        setKeywords(keywords.filter((e, i) => i !== idx))
    }
    const handleInput = (value) =>{
        setSearchInput(value);
    }
    const handleSearch = () => {
        if(searchType === 'author'){
            searchAuthors();
        }else{
            searchKeywords();
        }
    }
    const searchAuthors = () =>{

        fetch(`${APP.BASE_URL}/search/${searchInput}`, {mode: 'cors'})
        .then(resp => resp.json())
        .then((data) => {
            setResultsCount(data['authors'].length);

            const authorsToQuotes = {};
            for(const {author, quotes} of data['authors']){
                authorsToQuotes[author] = quotes;
            }
            setResults(
                {authors: [...Object.keys(authorsToQuotes)], 
                authorsToQuotes });
        });
    }
    const searchKeywords = () =>{

        fetch(`${APP.BASE_URL}/keyword-search/${keywords.join('-')}`, {mode: 'cors'})
        .then(resp => resp.json())
        .then((data) => {
            setResultsCount(Object.keys(data).length)
            setResults(Object.keys(data).map(quote => {
                return {quote, author: data[quote]['author'] }
            }))
        });
    }

    return (
      <>
      <NavComponent includeHome={true}/>
      <Container>
        
          <SearchType changeSearchType={changeSearchType}/>
          <Stack gap={5}>
            <Row className='text-center'>
                <Form>
                    <Stack gap={3}>
                        <Form.Group>
                            <Form.Control 
                                type="text" 
                                placeholder={searchType === 'author'? 'Enter author' : 'Enter keyword'} 
                                onInput={(e) => handleInput(e.target.value)}
                                value={searchInput}
                            />
                        </Form.Group>
                        { 
                            searchType === 'keyword' && 
                            <KeywordStack keywords={keywords} handleAddKeyword={handleAddKeyword} handleRemoveKeyword={handleRemoveKeyword}/>
                        }
                        <Button variant="primary" type="button" onClick={handleSearch}>
                            Search
                        </Button>
                    </Stack>
                </Form>
            </Row>
            <Row>
                { resultsCount !== null && `Displaying ${resultsCount} results.`}
                {
                    searchType === 'keyword' &&
                    Array.isArray(results) && 
                    <QuoteswithKeywords quotes={results} />
                }
                {
                    searchType === 'author' &&
                    results['authors'] && results['authorsToQuotes'] && 
                    <AuthorsAccordion authors = {results['authors']} authorsToQuotes={results['authorsToQuotes']}/>
                }
            </Row>
          </Stack>
      </Container>
      </>
    );
  }
  
  export default AuthorSearch;
  