import React from 'react';
import {
  Typography,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  amenityIconContainer: {
    marginRight: 5,
    '& svg': {
      width: '20px',
      height: 'auto',
      verticalAlign: 'text-bottom',
    }
  }
});

export default function HotelCard({ amenity }) {
  const classes = useStyles();

  return (
    <Box mr={2} display='inline-block'>
      <span className={classes.amenityIconContainer} dangerouslySetInnerHTML={{ __html: amenity.icon }}></span>
      <Typography variant='body1' component='span'>
        {amenity.name}
      </Typography>
    </Box>
  );
}
