import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  Box,
  Container,
  Grid,
  Link,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import sumBy from 'lodash.sumby';
import LoadingContentProgress from './LoadingContentProgress';
import Amenity from './Amenity';
import HotelRating from './HotelRating';
import RoomsTable from './RoomsTable';
import { formatPrice } from './helpers/functions';

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
  }
}));

export default function Hotel() {
  const params = useParams();
  const classes = useStyles();
  const [hotel, setHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const id = params.id;

  useEffect(() => {
    axios.get(`/api/hotels/${id}`)
      .then(response => {
        setHotel(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      })
  }, [id]);

  if (isLoading) {
    return <LoadingContentProgress />
  }

  if (!hotel) {
    return (
      <Box mt={3}>
        <Typography variant='h6'>Failed to load hotel.</Typography>
      </Box>)
    ;
  }

  const ratingSum = sumBy(hotel.reviews, 'rating');
  const formattedRooms = hotel.rooms.map(formatRoom);

  return (
    <Container className={classes.container} maxWidth='lg'>
      <Typography variant='h4' className={classes.heading}>
        {hotel.name}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <img src={hotel.thumbnailPhoto.url} alt={hotel.name} className={classes.image} />
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography>
            {hotel.description}
          </Typography>
          <Box mt={2}>
            <Typography>
              <strong>Address: </strong>{hotel.address.line1}, {hotel.address.city}, {hotel.address.province}, {hotel.address.postalCode}, {hotel.address.country}
            </Typography>
          </Box>
          <Box mt={1}>
            <Typography>
              <strong>Phone: </strong>{hotel.phone}
            </Typography>
          </Box>
          <Box mt={1}>
            <Typography>
              <strong>Website: </strong><Link href={hotel.website}>{hotel.website}</Link>
            </Typography>
          </Box>
          <Box mt={1}>
            <Typography component='span'>
              <strong>Amenities: </strong>
              <Box component='span' ml={1}>
                {hotel.amenities.map(amenity => (
                  <Amenity key={amenity.id} amenity={amenity} />
                ))}
              </Box>
            </Typography>
          </Box>
          <Box mt={1}>
            <HotelRating
              numberOfReviews={hotel.reviews.length}
              ratingSum={ratingSum}
            />
          </Box>
        </Grid>
      </Grid>
      <Box mt={4}>
        <Divider />
      </Box>
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant='h5'>Rooms</Typography>
            <RoomsTable rooms={formattedRooms} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

function formatRoom(room) {
  const roomType =room.type;
  const category = roomType[0] === 'A' ? 'Superior' : 'Standard';
  const numberOfBeds = Number(roomType[1]);
  const bedType = getBedTypeWord(roomType[2]);
  const price = formatPrice(room.price);

  return {
    category,
    numberOfBeds,
    bedType,
    price,
  }
}

function getBedTypeWord(bedTypeLetter) {
  switch (bedTypeLetter) {
    case 'K':
      return 'king';
    case 'Q':
      return 'queen';
    case 'D':
      return 'double';
    case 'S':
      return 'single';
    default:
      throw new Error('unknown bed type');
  }
}
