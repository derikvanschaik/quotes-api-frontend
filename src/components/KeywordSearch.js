import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import {useState} from 'react';
import NavComponent from './NavComponent';
import Badge from 'react-bootstrap/Badge';

function AuthorSearch() {
    const [keywords, setKeywords] = useState([]);
    const [search, setSearch] = useState('')
    const [quotes, setQuotes] = useState({})
    const [resultsCount, setResultsCount] = useState(null)

    const addKeyword = () =>{
        if(search === '') return
        setKeywords([...keywords, search])
        setSearch('')
    }
    const fetchKeywords = () =>{
        if(keywords.length === 0){
            setResultsCount(null)
            setQuotes([])
            return
        }
        fetch(`https://enhanced-type-fit.herokuapp.com/keyword-search/${keywords.join('-')}`, {mode: 'cors'})
        .then(resp => resp.json())
        .then((data) => {
            setResultsCount([...Object.keys(data)].length)
            setQuotes(data)
        });
    }
    return (
      <>
      <NavComponent includeHome={true}/>
      <Container>
          <h1 className='text-center'>Keyword Search</h1>
          <Stack gap={5}>
            <Row className='text-center'>
                <Form>
                    <Stack gap={3}>
                        <Row>
                            <Col lg={10}>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter a keyword"
                                    onInput={(e) => setSearch(e.target.value)}
                                    value={search}
                                />
                            </Col>
                            <Col lg={2}>
                                <Button variant="primary" type="button" onClick={addKeyword}>
                                    Add Keyword
                                </Button>
                            </Col>
                        </Row>
                        {/* TODO: add an overflow x scroll css property... */}
                        <Stack gap={3} direction="horizontal">
                            {
                                keywords.map((key, idx) => {
                                    return(
                                        <Button variant='light'>
                                        {key}
                                            <Badge
                                                bg="secondary">
                                                <span 
                                                    aria-hidden="true"
                                                    onClick={()=>setKeywords(keywords.filter((e, i) => i !== idx))}>
                                                        &times;
                                                </span>
                                            </Badge>
                                        </Button>
                                    )
                                })
                            }
                        </Stack>
                        <Button variant="primary" type="button" onClick={fetchKeywords}>
                            Search
                        </Button>
                    </Stack>
                </Form>
            </Row>
            { resultsCount !== null && <p>{resultsCount} results.</p>}
            <ul className='list-group'>
                {
                    Object.keys(quotes).map(quote =>{
                        return (
                            <li className='list-group-item'>
                                <p>"{quote}"</p>
                                <p>-{quotes[quote]['author'] || 'Anonymous'}</p>
                            </li>
                        )
                    })
                }
            </ul>
            
          </Stack>
      </Container>
      </>
    );
  }
  
  export default AuthorSearch;