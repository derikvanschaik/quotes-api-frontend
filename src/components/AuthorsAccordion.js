import Accordion from 'react-bootstrap/Accordion';
import AuthorComponent from './AuthorComponent';

function AuthorsAccordion({authors, authorsToQuotes }){
    return (
        <Accordion>
            {authors.map((auth, idx) =>{
            const key = Array.from(Object.keys(authorsToQuotes)).indexOf(auth);
            return (
                <Accordion.Item eventKey={"" + key}>
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