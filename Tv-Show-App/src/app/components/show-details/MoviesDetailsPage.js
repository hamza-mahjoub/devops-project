import React, { useEffect } from "react";

// to get Id from url
import { useParams } from "react-router-dom";

// redux mapping
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieReviews, findById } from "../../slices/movies.slice";

// material ui components
import {
  Container,
  CardMedia,
  Card,
  Typography,
  CardContent,
  Box,
  Divider,
} from "@mui/material";
import { REQUEST_STATUS } from "../../api/constants";
import { ErrorComponent } from "../shared/ErrorComponent";
import { LoaderComponent } from "../shared/LoaderComponent";

export const MovieDetailsPage = () => {
  // set up dispatch
  const dispatch = useDispatch();

  // fetch data from store
  const {
    movie,
    movieReviews,
    statusGetSelectedMovie,
    statusGetSelectedMovieReviews,
  } = useSelector((state) => state.movies);

  let { id } = useParams();

  // hook to fetch tv shows
  useEffect(() => {
    if (!movie || movie.id !== id) dispatch(findById(id));
    dispatch(fetchMovieReviews(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // the loader
  if (
    statusGetSelectedMovie === REQUEST_STATUS.loading ||
    statusGetSelectedMovieReviews === REQUEST_STATUS.loading ||
    movie === null
  )
    return <LoaderComponent />;

  // a message if there is an error
  if (
    statusGetSelectedMovie === REQUEST_STATUS.error ||
    statusGetSelectedMovieReviews === REQUEST_STATUS.error
  )
    return <ErrorComponent />;

  return (
    <Container fixed>
      <Card sx={{ maxWidth: "100%", marginTop: 5, marginBottom: 5 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="auto"
          image={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
              : "https://www.vuescript.com/wp-content/uploads/2018/11/Show-Loader-During-Image-Loading-vue-load-image.png"
          }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {movie.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {`First air date: ${movie.release_date}`}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {`Tagline: ${movie.tagline}`}
          </Typography>
          <Typography variant="body2">{movie.overview}</Typography>
          <Typography marginTop={1} variant="h5" component="div">
            Reviews
          </Typography>
          <Divider sx={{ marginBottom: 1 }} />
          <Box sx={{ height: "50vh", overflow: "auto" }}>
            {movieReviews &&
              movieReviews.results.length !== 0 &&
              movieReviews.results.map((review) => (
                <Box sx={{ marginTop: 1, marginBottom: 1 }}>
                  <Typography
                    gutterBottom
                    marginTop={1}
                    variant="h6"
                    component="div"
                  >
                    Author {review.author} : {review?.author_details?.rating}/10
                  </Typography>
                  <Typography variant="body2">{review.content}</Typography>
                </Box>
              ))}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

MovieDetailsPage.prototype = {};
