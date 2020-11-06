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
  amenityIconContainer: {
    marginRight: 5,
    '& svg': {
      width: '20px',
      height: 'auto',
      verticalAlign: 'text-bottom',
    }
  }
}));

export default function HotelCard({ hotel }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={hotel.thumbnailPhoto.url}
        title={hotel.name}
      />
      <Box display='flex' flexDirection='column' flexGrow={1}>
        <CardContent className={classes.cardContent}>
          <Link variant="h6" href='#'>
            {hotel.name}
          </Link>
          <Typography>
            {hotel.address.line1}, {hotel.address.city}
          </Typography>
          <Box mt={1} pb={1}>
            {hotel.amenities.map(amenity => (
              <Box mr={2} display='inline-block' key={amenity.id}>
                <span className={classes.amenityIconContainer} dangerouslySetInnerHTML={{ __html: amenity.icon }}></span>
                <Typography variant='body1' component='span'>
                  {amenity.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
        <Box display='flex' justifyContent='flex-end'>
          <Button variant='contained' color='primary' disableElevation>View</Button>
        </Box>
      </Box>
    </Card>
  );
}
