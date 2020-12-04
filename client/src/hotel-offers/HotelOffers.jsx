import React, { useState, useEffect, useCallback } from 'react';
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

const initialSearchString = 'Toronto, Canada';

export default function HotelOffers() {
  const classes = useStyles();
  const [hotelOffers, setHotelOffers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState(initialSearchString);
  const [cities, setCities] = useState([]);

  const searchOptions = cities.map(city => city.name);

  const search = useCallback(
    (searchString) => {
      setIsLoading(true);

      axios.get(`/api/hotel-offers?search=${searchString}`)
        .then(response => {
          setHotelOffers(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          setIsLoading(false);
        })
    },
    []
  );

  useEffect(() => {
    function fetchCities() {
      axios.get('/api/cities')
        .then(response => {
          setCities(response.data);
        });
    }

    fetchCities();
    search(initialSearchString);
  }, [search]);

  function getContent() {
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
      <>
        {hotelOffers.map(hotelOffer => (
          <HotelOfferCard key={hotelOffer.hotel.hotelId} hotelOffer={hotelOffer} />
        ))}
      </>
    );
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
                  fullWidth
                  freeSolo
                  options={searchOptions}
                  value={searchString}
                  onInputChange={(event, newValue) => setSearchString(newValue)}
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
                    onClick={() => search(searchString)}
                    disabled={isLoading}
                    disableElevation
                  >
                    Search
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
          {getContent()}
        </Grid>
      </Grid>
    </Container>
  );
};
