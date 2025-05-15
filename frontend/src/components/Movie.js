import React, { useState, useEffect } from 'react';
import MovieDataService from '../services/movies';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import moment from 'moment';

import "./Movie.css";

const Movie = () => {
  let params = useParams();

  const [movie, setMovie] = useState({
    id: null,
    title: "",
    rated: "",
    reviews: []
  });

  useEffect(() => {
    const getMovie = id => {
      MovieDataService.getMovie(id)
        .then(response => {
          setMovie(response.data);
        })
        .catch(e => {
          console.error(e);
        });
    };
    getMovie(params.id);
  }, [params.id]);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <div className='poster'>
              <Image
                className='bigPicture'
                src={movie.poster ? movie.poster + '/100px250' : '../images/NoPosterAvailable-crop.jpg'}
                fluid
              />
            </div>
          </Col>
          <Col>
            <Card>
              <Card.Header as="h5">{movie.title}</Card.Header>
              <Card.Body>
                <Card.Text>
                  {movie.plot}
                </Card.Text>
              </Card.Body>
            </Card>

            <h2>Reviews</h2>
            <br />
            {movie.reviews.map((review, index) => (
              <div className='d-flex' key={index}>
                <div className='flex-shrink-0 reviewsText'>
                  <h5>{review.name + " reviewed on "}{moment(review.date).format("Do MMMM YYYY")}</h5>
                  <p className='review'>{review.review}</p>
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Movie;
