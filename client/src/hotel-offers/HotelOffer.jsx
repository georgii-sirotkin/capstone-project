import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  Box,
  Container,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import LoadingContentProgress from '../LoadingContentProgress';
import HotelRating from '../HotelRating';
import HotelOfferAmenities from './HotelOfferAmenities';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    }
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
  image: {
    width: '100%',
    height: 'auto',
    maxHeight: 300,
    objectFit: 'cover',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
}));

export default function Hotel() {
  const params = useParams();
  const classes = useStyles();
  const [hotelOffer, setHotelOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [amenities, setAmenities] = useState([]);
  const id = params.id;


  useEffect(() => {
    axios.get(`/api/hotel-offers/${id}`)
      .then(response => {
        setHotelOffer(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      })
  }, [id]);

  useEffect(() => {
    axios.get('/api/amenities')
      .then(response => {
        setAmenities(response.data);
      });
  }, []);

  if (isLoading) {
    return <LoadingContentProgress />
  }

  if (!hotelOffer) {
    return (
      <Box mt={3}>
        <Typography variant='h6'>Failed to load hotel.</Typography>
      </Box>)
    ;
  }

  const hotel = hotelOffer.hotel;
  const address = extractAddress(hotel);

  return (
    <Container className={classes.container} maxWidth='lg'>
      <Typography variant='h4' className={classes.heading}>
        {hotel.name}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <img src={hotel.media ? hotel.media[0].uri : undefined} alt={hotel.name} className={classes.image} />
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography>
            {hotel.description ? hotel.description.text : fallbackDescription}
          </Typography>
          <Box mt={2}>
            <Typography className={classes.capitalize}>
              <strong>Address: </strong>{address.toLowerCase()}
            </Typography>
          </Box>
          <Box mt={1}>
            <Typography>
              <strong>Phone: </strong>{hotel.contact.phone}
            </Typography>
          </Box>
          <Box mt={1}>
            <Typography component='span'>
              <strong>Amenities: </strong>
              <Box component='span' ml={1}>
                <HotelOfferAmenities
                  allAmenities={amenities}
                  amenityCodes={hotel.amenities}
                />
              </Box>
            </Typography>
          </Box>
          <Box mt={1}>
            <HotelRating
              numberOfReviews={0}
              ratingSum={0}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

const fallbackDescription = 'Trendsetting and boundary-breaking, The St. Regis Toronto marks its Canadian debut at the citys most coveted address in the heart of downtown. Soaring 65-stories above Canadas international enclave for business and culture, The St. Regis Toronto hotel offers a remarkably central location, steps from Torontos most preeminent downtown landmarks including the CN Tower, Scotiabank Arena, Rogers Centre, Toronto International Film Festival and the citys premier shopping, theatre and entertainment. Modern elegance and bespoke butler service unite amongst 258 of the citys largest luxury hotel guestrooms and suites, defining the new standard for luxury in Canada.';

function extractAddress(hotel) {
  const addressParts = [];
  addressParts.push(hotel.address.lines.join(', '));
  addressParts.push(hotel.address.cityName);
  addressParts.push(hotel.address.stateCode);
  addressParts.push(hotel.address.postalCode);
  addressParts.push(hotel.address.country);

  return addressParts.filter(string => string).join(', ');
}
