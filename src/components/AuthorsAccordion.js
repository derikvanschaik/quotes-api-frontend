import Accordion from 'react-bootstrap/Accordion';
import AuthorComponent from './AuthorComponent';

function AuthorsAccordion({authors, authorsToQuotes }){
    return (
        <Accordion>
            {authors.map((auth, idx) =>{
            return (
                <Accordion.Item eventKey={"" + idx}>
                    <Accordion.Header>{auth}</Accordion.Header>
                    <Accordion.Body>
                        <AuthorComponent author={auth} authorsToQuotes={authorsToQuotes}/>
                    </Accordion.Body>
                </Accordion.Item>
            )
        })}
        </Accordion>
    )
}

export default AuthorsAccordion;