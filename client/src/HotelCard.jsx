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
import Amenity from './Amenity';
import HotelRating from './HotelRating';
import { formatPrice } from './helpers/functions';

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

export default function HotelCard({ hotel }) {
  const classes = useStyles();
  const hotelUrl = `/hotels/${hotel.id}`;
  const formattedPrice = formatPrice(hotel.minPrice);

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={hotel.thumbnailPhoto.url}
        title={hotel.name}
      />
      <Box display='flex' flexDirection='column' flexGrow={1}>
        <CardContent className={classes.cardContent}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={8} lg={9}>
              <Link variant='h6' component={RouterLink} to={hotelUrl}>
                {hotel.name}
              </Link>
              <Typography>
                {hotel.address.line1}, {hotel.address.city}
              </Typography>
              <Box mt={1} pb={1}>
                {hotel.amenities.map(amenity => (
                  <Amenity key={amenity.id} amenity={amenity} />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} lg={3}>
              <Typography variant='h5' className={classes.price}>
                {formattedPrice}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <Box display='flex' pl={2} justifyContent='space-between' alignItems='center'>
          <HotelRating
            numberOfReviews={hotel.reviewsCount}
            ratingSum={hotel.ratingSum}
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
