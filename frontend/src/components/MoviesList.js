import React, { useState, useEffect, useCallback } from 'react';
import MovieDataService from "../services/movies";
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import "./MoviesList.css";

const MoviesList = ({ user }) => {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState(["All Ratings"]);

  const retrieveRatings = useCallback(() => {
    MovieDataService.getRatings()
      .then(response => {
        setRatings(["All Ratings"].concat(response.data));
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const retrieveMovies = useCallback(() => {
    MovieDataService.getAll()
      .then(response => {
        setMovies(response.data.movies);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const find = useCallback((query, by) => {
    MovieDataService.find(query, by)
      .then(response => {
        setMovies(response.data.movies);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const findByTitle = useCallback(() => {
    find(searchTitle, "title");
  }, [find, searchTitle]);

  const findByRating = useCallback(() => {
    if (searchRating === "All Ratings") {
      retrieveMovies();
    } else {
      find(searchRating, "rated");
    }
  }, [find, searchRating, retrieveMovies]);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  }

  const onChangeSearchRating = e => {
    const searchRating = e.target.value;
    setSearchRating(searchRating);
  }

  useEffect(() => {
    retrieveRatings();
    retrieveMovies();
  }, [retrieveRatings, retrieveMovies]);

  return (
    <div className="App">
      <Container className="main-container">
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control 
                  type='text'
                  placeholder='Search by title'
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                />
              </Form.Group>
              <Button 
                variant='primary'
                type='button'
                onClick={findByTitle}
              >
                Search
              </Button>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Control 
                  as='select'
                  onChange={onChangeSearchRating}
                  value={searchRating}
                >   
                  {ratings.map((rating, i) => (
                    <option value={rating} key={i}>
                      {rating}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>   
              <Button 
                variant='primary'
                type='button'
                onClick={findByRating}
              >
                Search
              </Button> 
            </Col>
          </Row>
        </Form>
        <Row className='movieRow'>
          {movies.map((movie) => (
            <Col key={movie._id}>
              <Card className='movieListCard'>
                {user}
                <Card.Img 
                  className='smallPoster' 
                  src={movie.poster + "/100px180"} 
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "images/NoPosterAvailable-crop.jpg";
                  }} 
                />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>Rating: {movie.rated}</Card.Text>
                  <Card.Text>{movie.plot}</Card.Text>
                  <Link to={"/movies/" + movie._id}>
                    View Reviews
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
export default MoviesList;
