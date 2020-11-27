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
import LoadingContentProgress from '../LoadingContentProgress';
import HotelOfferCard from './HotelOfferCard';

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

export default function HotelOffers() {
  const classes = useStyles();
  const [hotelOffers, setHotelOffers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [cities, setCities] = useState([]);

  const searchOptions = cities.map(city => city.code);

  function search() {
    setIsSearching(true);

    axios.get(`/api/hotel-offers?city=${searchString}`)
      .then(response => {
        setHotelOffers(response.data);
        setIsSearching(false);
      })
      .catch(error => {
        setIsSearching(false);
      })
  }

  function renderSearchOption(code) {
    if (!code) {
      return '';
    }

    return cities.find(city => city.code === code).name;
  }

  useEffect(() => {
    function fetchAllHotels() {
      axios.get('/api/hotel-offers')
        .then(response => {
          setHotelOffers(response.data);
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

  if (!hotelOffers) {
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
                  getOptionLabel={renderSearchOption}
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
          {hotelOffers.map(hotelOffer => (
            <HotelOfferCard key={hotelOffer.hotel.hotelId} hotelOffer={hotelOffer} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};
