import { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import MoviesList from "./components/MoviesList";
import Movie from "./components/Movie";
import Login from "./components/Login";
import Logout from './components/Logout';

import "./App.css";

function App() {
  console.log("APP RENDER");
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Navbar bg="primary" expand="lg" sticky="top" variant="dark">
        <Container className="container-fluid">
          <Navbar.Brand className="brand" href="/">
            MOVIE REVIEWS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to={"/movies"}>
                Movies
              </Nav.Link>
              {user && (
                <Nav.Link className="text-white">
                  Hello, {user}
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
          {user ? (
            <Logout setUser={setUser} />
          ) : (
            <Login setUser={setUser} />
          )}
        </Container>
      </Navbar>

      <Routes>
        <Route exact path={"/"} element={<MoviesList user={user} />} />
        <Route exact path={"/movies"} element={<MoviesList user={user} />} />
        <Route exact path={"/movies/:id"} element={<Movie />} />
      </Routes>
    </div>
  );
}

export default App;
