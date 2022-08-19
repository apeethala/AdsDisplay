import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Searchresult(props){
    return(
        <div style={{ width: '50%',height:'50%'}}>
        <Card >
         <Card.Header as="h2">{props.primaryText}</Card.Header>
      <Card.Img variant="top" src={props.imageUrl} width="100%" />
      <Card.Body>
        <Card.Title>{props.headLine}</Card.Title>
        <Card.Text>
          {props.description}
        </Card.Text>
        <Button variant="primary">{props.CTA}</Button>
      </Card.Body>
    </Card>
        </div>
       
    )
     
   
}

export default Searchresult;