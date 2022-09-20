import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useParams } from "react-router-dom";
import APP from '../enums/enum'

export default function RelatedImages() {
  const author = useParams().author;
  const [images, setImages] = useState([])

  useEffect(()=>{
    fetch(APP.BASE_URL + '/images/' + author, {mode: 'cors'})
    .then(resp => resp.json())
    .then(data => {
        setImages(data['images']);
    })
  }, [])

  return (
    <Container>
        {
            images.map(src => <img src={src} />)
        }
    </Container>
  );
}