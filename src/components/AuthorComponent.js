import {useState, useEffect} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Spinner from 'react-bootstrap/Spinner';

function AuthorComponent({author, authorsToQuotes}){
    const [imgSrc, setImgSrc] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchImage = () =>{
        setIsLoading(true);
        fetch(`https://enhanced-type-fit.herokuapp.com/${author}`, {mode: 'cors'})
        .then(resp => resp.json())
        .then((data) => {
          setIsLoading(false);
          if(data.image){
            setImgSrc(data.image)
          }else{
            setImgSrc('https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg');
          }
        });
    }
    // whenever the author props is changed, we want to set the default tab to quotes
    useEffect(
        () =>{
            setKey('quotes');
            setImgSrc(null);
        }
    ,[author]);

    const [key, setKey] = useState('quotes');

    const handleSelect = (key) =>{
        if(key === 'image'){
            fetchImage();
        }else{
            setImgSrc(null);
        }
        setKey(key);
    }

    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => handleSelect(k)}
            className="mb-3"
        >
            <Tab eventKey="quotes" title="Quotes">
                <ul className='list-group'>
                    {
                        authorsToQuotes[author]
                        && 
                        authorsToQuotes[author].map(quote => <li className='list-group-item'>{quote}</li>)
                    }
                </ul>
            </Tab>
            <Tab eventKey="image" title="Image">
                {isLoading && imgSrc === null &&
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                }
                <img src={imgSrc}/>
            </Tab>
        </Tabs>
    )
}

export default AuthorComponent;