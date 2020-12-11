import React from 'react';
import {
  Typography,
  Button,
  Box,
  Card,
  CardMedia,
  CardContent,
  Link,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import HotelRating from '../HotelRating';
import HotelOfferAmenities from './HotelOfferAmenities';
import { formatPrice } from '../helpers/functions';

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
  price: {
    fontSize: '28px',
    marginBottom: theme.spacing(1),

    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(1),
      textAlign: 'right',
      marginBottom: 0,
    }
  }
}));

export default function HotelOfferCard({ hotelOffer, amenities }) {
  const classes = useStyles();
  const hotel = hotelOffer.hotel;
  const hotelUrl = `/hotel-offers/${hotel.hotelId}`;
  const address = extractAddress(hotel);
  const formattedPrice = formatPrice(hotelOffer.offers[0].price.total);

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={hotel.media ? hotel.media[0].uri : undefined}
        title={hotel.name}
      />
      <Box display='flex' flexDirection='column' flexGrow={1}>
        <CardContent className={classes.cardContent}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={8} lg={9}>
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
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <Typography variant='h5' className={classes.price}>
                {formattedPrice}
              </Typography>
            </Grid>
          </Grid>
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
