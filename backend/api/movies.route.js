import express from 'express';
import MoviesController from './movies.controller.js';
import ReviewsController from './reviews.controller.js';


const router = express.Router();

router.route("/").get(MoviesController.apiGetMovies);
router.route("/id/:id").get(MoviesController.apiGetMovieById);
router.route("/ids/:ids").get(MoviesController.apiGetListOfMoviesByIds);
router.route("/ratings").get(MoviesController.apiGetRatings);

router.route("/review").post(ReviewsController.apiPostReview);
router.route("/review").put(ReviewsController.apiUpdateReview);
router.route("/review").delete(ReviewsController.apiDeleteReview);

export default router;