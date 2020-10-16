import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LoadingContentProgress from './LoadingContentProgress';

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),

    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    }
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
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
    <Container className={classes.cardGrid} maxWidth='lg'>
      <Grid container spacing={4}>
        {hotels.map(hotel => (
          <Grid item key={hotel.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image='https://cf.bstatic.com/xdata/images/hotel/square600/262993892.webp?k=07dbad2f2eb2ab01416b8f7873f8af20a11f05c80a5d4ef0c40be09b3acd5d85&o='
                title={hotel.name}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h6" component="h2">
                  {hotel.name}
                </Typography>
                <Typography>
                  Information about the hotel
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
