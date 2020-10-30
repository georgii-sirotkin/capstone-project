import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  Box,
  Container,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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

  useEffect(() => {
    axios.get('/api/hotels')
      .then(response => {
        setHotels(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      })
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
          {hotels.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};
