import React, { useState } from "react";
import MovieDataService from '../services/movies';
import { useLocation, useNavigate,useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const AddReview = ({user}) => {
    return (
        <h2>Thêm review</h2>
    )
}

export default AddReview;