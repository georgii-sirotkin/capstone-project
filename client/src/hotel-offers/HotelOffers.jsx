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
import FiltersBlock from '../FiltersBlock';

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
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenityCodes, setSelectedAmenityCodes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const searchOptions = cities.map(city => city.name);
  let filteredHotelOffers = null;

  if (!isLoading && hotelOffers) {
    filteredHotelOffers = filterHotelOffers(hotelOffers, priceRange, selectedAmenityCodes);
  }

  const search = useCallback(
    (searchString) => {
      setIsLoading(true);

      axios.get(`/api/hotel-offers?search=${searchString}`)
        .then(response => {
          setHotelOffers(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          if (error.response.status === 400) {
            alert('Couldn\'t geocode this address');
            setHotelOffers([]);
          }

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

    function fetchAmenities() {
      axios.get('/api/amenities')
        .then(response => {
          setAmenities(response.data);
        });
    }

    fetchAmenities();
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

    if (filteredHotelOffers.length === 0) {
      return (
        <Box mt={3}>
          <Typography variant='h6'>No results</Typography>
        </Box>
      );
    }

    return filteredHotelOffers.map(
      hotelOffer => (
        <HotelOfferCard
          key={hotelOffer.hotel.hotelId}
          hotelOffer={hotelOffer}
          amenities={amenities}
        />
      )
    );
  }

  return (
    <Container className={classes.container} maxWidth='lg'>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <FiltersBlock
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            amenities={amenities}
            selectedAmenityCodes={selectedAmenityCodes}
            onSelectedAmenityCodesChange={setSelectedAmenityCodes}
            numberOfHotels={filteredHotelOffers ? filteredHotelOffers.length : 0}
            isLoadingHotels={isLoading}
          />
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

function filterHotelOffers(hotelOffers, priceRange, selectedAmenityCodes) {
  return hotelOffers.filter(
    hotelOffer => shouldDisplayHotelOffer(hotelOffer, priceRange, selectedAmenityCodes)
  );
}

function shouldDisplayHotelOffer(hotelOffer, priceRange, selectedAmenityCodes) {
  const offer = hotelOffer.offers[0];
  const price = offer.price.total;

  if (price < priceRange[0] || price > priceRange[1]) {
    return false;
  }

  if (selectedAmenityCodes.length === 0) {
    return true;
  }

  return hasAmenities(hotelOffer.hotel, selectedAmenityCodes);
}

function hasAmenities(hotel, amenityCodes) {
  for (const amenityCode of amenityCodes) {
    if (!hotel.amenities.some(amenity => amenity === amenityCode)) {
      return false;
    }
  }

  return true;
}
