import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  Box,
  Container,
  Grid,
  TextField,
  Paper,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LoadingContentProgress from './LoadingContentProgress';
import HotelCard from './HotelCard';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),

    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    }
  },
}));

export default function Hotels() {
  const classes = useStyles();
  const [hotels, setHotels] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [cities, setCities] = useState([]);

  const searchOptions = cities.map(city => city.name);

  function search() {
    setIsSearching(true);

    axios.get(`/api/hotels?city=${searchString}`)
      .then(response => {
        setHotels(response.data);
        setIsSearching(false);
      })
      .catch(error => {
        setIsSearching(false);
      })
  }

  useEffect(() => {
    function fetchAllHotels() {
      axios.get('/api/hotels')
        .then(response => {
          setHotels(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          setIsLoading(false);
        })
    }

    function fetchCities() {
      axios.get('/api/cities')
        .then(response => {
          setCities(response.data);
        });
    }

    fetchAllHotels();
    fetchCities();
  }, []);

  if (isLoading) {
    return <LoadingContentProgress />
  }

  if (!hotels) {
    return (
      <Box mt={3}>
        <Typography variant='h6'>Failed to load hotels.</Typography>
      </Box>)
    ;
  }

  return (
    <Container className={classes.container} maxWidth='lg'>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Box bgcolor='grey.200' height='100%' p={3}>
            Filters
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box mb={3}>
            <Paper elevation={1}>
              <Box display='flex' p={2} alignItems='flex-end'>
                <Autocomplete
                  disableClearable
                  options={searchOptions}
                  value={searchString}
                  onChange={(event, newValue) => {
                    setSearchString(newValue);
                  }}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Destination"
                      InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                  )}
                />
                <Box ml={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={search}
                    disabled={isSearching}
                    disableElevation
                  >
                    Search
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
          {hotels.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};
