import { useEffect, useState, React } from "react";

// for moving from one page to another
import { useNavigate } from "react-router-dom";

// redux mapping
import { useDispatch, useSelector } from "react-redux";
import { findAllByType, findAllByContent } from "../../slices/tvShows.slice";

// material ui components
import {
  Autocomplete,
  Container,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
  IconButton,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";

import { ErrorComponent } from "../shared/ErrorComponent";
import { REQUEST_STATUS } from "../../api/constants";
import { LoaderComponent } from "../shared/LoaderComponent";
import { tvShowsTypes } from "../../constants/ShowsTypes";

// Icons
import PreviewIcon from "@mui/icons-material/Preview";
import SearchIcon from "@mui/icons-material/Search";

export const TvSearchPage = (props) => {
  // used in data fetching
  const [query, setQuery] = useState({
    page: 1,
    searchValue: "",
    type: "airing_today",
  });

  // set up navigate
  const navigate = useNavigate();

  // set up dispatch
  const dispatch = useDispatch();

  // fetch data from store
  const { tvShows, statusGetTvShows } = useSelector((state) => state.tvShows);

  // hook to fetch tv shows
  useEffect(() => {
    if (query.searchValue === "")
      dispatch(findAllByType({ page: query.page, type: query.type }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // fired when a type is selected
  // it resets everything
  const handleTypeChange = (event) => {
    setQuery({ page: 1, searchValue: "", type: event.target.value });
  };

  // when we change the requested page of tv shows
  const handlePageChange = (event, value) => {
    setQuery({ ...query, page: value });
  };

  // fired when we change a page of the result of a search by title
  const handlePageChangeTitle = (event, value) => {
    setQuery({ ...query, page: value });
    dispatch(
      findAllByContent({ page: query.page, searchValue: query.searchValue })
    );
  };

  // when we select a value from the auto complete component
  const handleAutoCompleteChange = (event, newValue) => {
    navigate(`/tv-show/${newValue.id}`);
  };

  // updates the search by title value
  const handleSearchValueChange = (event) => {
    setQuery({ ...query, searchValue: event.target.value });
  };

  // when the search button is clicked
  const searchTvShows = () => {
    dispatch(
      findAllByContent({ page: query.page, searchValue: query.searchValue })
    );
  };

  // the loader
  if (statusGetTvShows === REQUEST_STATUS.loading) return <LoaderComponent />;

  // a message if there is an error
  if (statusGetTvShows === REQUEST_STATUS.error) return <ErrorComponent />;

  if (tvShows.total_pages !== 0)
    return (
      <Container fixed>
        <Paper elevation={3}>
          <Grid
            container
            spacing={2}
            sx={{ marginTop: 5 }}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={10} sm={7} sx={{ marginBottom: 2 }}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment">
                  Title Content
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment"
                  value={query.searchValue}
                  onChange={handleSearchValueChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={searchTvShows}
                        edge="end"
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Title Content"
                />
              </FormControl>
            </Grid>
            <Grid item xs={10} sm={4} sx={{ marginBottom: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="tv-show-type-select">Quick Search</InputLabel>
                <Select
                  labelId="tv-show-type-select"
                  id="demo-simple-select"
                  value={query.type}
                  label="Quick Search"
                  onChange={handleTypeChange}
                >
                  {tvShowsTypes.map((type) => (
                    <MenuItem key={type.path} value={type.path}>
                      {type.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={3}>
          <Grid
            container
            spacing={2}
            sx={{ marginTop: 5 }}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} sm={12} width="80%" sx={{ marginTop: 3 }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={tvShows?.results}
                renderInput={(params) => (
                  <TextField {...params} label="Search in the Tv Show List" />
                )}
                fullWidth={true}
                getOptionLabel={(option) => option.name}
                onChange={handleAutoCompleteChange}
              />
            </Grid>
          </Grid>

          <List dense={true}>
            <Grid container spacing={2} sx={{ marginTop: 5 }}>
              {tvShows?.results?.map((tvShow) => (
                <Grid key={tvShow.id} item xs={12} sm={6} sx={{ marginTop: 2 }}>
                  <ListItem
                    onClick={(event) => navigate(`/tv-show/${tvShow.id}`)}
                  >
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar>
                          {tvShow.backdrop_path ? (
                            <img
                              width={30}
                              height={30}
                              alt="no_image"
                              src={`https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`}
                            ></img>
                          ) : (
                            <PreviewIcon />
                          )}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={tvShow.name}
                        secondary={`Language: ${tvShow.original_language}; First Aired: ${tvShow.first_air_date}`}
                      />
                    </ListItemButton>
                  </ListItem>
                </Grid>
              ))}
            </Grid>
          </List>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={5} sm={12} sx={{ marginTop: 5, marginBottom: 5 }}>
              <Pagination
                count={tvShows?.total_pages}
                variant="outlined"
                shape="rounded"
                page={query.page}
                onChange={
                  query.searchValue === ""
                    ? handlePageChange
                    : handlePageChangeTitle
                }
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
};

TvSearchPage.prototype = {};
