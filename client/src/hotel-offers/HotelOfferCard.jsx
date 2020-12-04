import React from 'react';
import {
  Typography,
  Button,
  Box,
  Card,
  CardMedia,
  CardContent,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import HotelRating from '../HotelRating';
import HotelOfferAmenities from './HotelOfferAmenities';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },
  cardMedia: {
    width: 120,
    height: 120,
    flexShrink: 0,

    [theme.breakpoints.up('sm')]: {
      width: 170,
      height: 170,
    },

    [theme.breakpoints.up('md')]: {
      width: 220,
      height: 220,
    }
  },
  cardContent: {
    padding: theme.spacing(0, 0, 0, 2),
    flexGrow: 1,
  },
  capitalize: {
    textTransform: 'capitalize',
  },
}));

export default function HotelOfferCard({ hotelOffer, amenities }) {
  const classes = useStyles();
  const hotel = hotelOffer.hotel;
  const hotelUrl = `/hotel-offers/${hotel.hotelId}`;
  const address = extractAddress(hotel);

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={hotel.media ? hotel.media[0].uri : undefined}
        title={hotel.name}
      />
      <Box display='flex' flexDirection='column' flexGrow={1}>
        <CardContent className={classes.cardContent}>
          <Link variant="h6" component={RouterLink} to={hotelUrl} className={classes.capitalize}>
            {hotel.name.toLowerCase()}
          </Link>
          <Typography className={classes.capitalize}>
            {address.toLowerCase()}
          </Typography>
          <Box mt={1} pb={1}>
            <HotelOfferAmenities
              allAmenities={amenities}
              amenityCodes={hotel.amenities}
            />
          </Box>
        </CardContent>
        <Box display='flex' pl={2} mt={2} justifyContent='space-between' alignItems='center'>
          <HotelRating
            numberOfReviews={0}
            ratingSum={0}
          />
          <Button
            variant='contained'
            color='primary'
            component={RouterLink}
            to={hotelUrl}
            disableElevation
          >
            View
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

function extractAddress(hotel) {
  return hotel.address.lines.join(', ') + ', ' + hotel.address.cityName;
}
