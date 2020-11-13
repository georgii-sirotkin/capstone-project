import React from 'react';
import { Typography, Box } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  starIcon: {
    color: 'rgb(255, 56, 92)',
    marginLeft: -2,
  },
  averageRating: {
    fontWeight: 500,
    marginLeft: 3,
    fontSize: '15px',
  },
  numberOfReviews: {
    marginLeft: 3,
    fontSize: '15px',
    color: theme.palette.grey[700],
  }
}));

export default function HotelRating({ numberOfReviews, ratingSum }) {
  const classes = useStyles();

  if (numberOfReviews === 0) {
    return <Typography variant='body2'>No reviews</Typography>;
  }

  const averageRating = ratingSum / numberOfReviews;
  const formattedAverageRating = Number.isInteger(averageRating) ? averageRating.toFixed(1) : averageRating.toFixed(2);

  return (
    <Box display='flex' alignItems='center'>
      <StarIcon className={classes.starIcon} />
      <span className={classes.averageRating}>
        {formattedAverageRating}
      </span>
      <span className={classes.numberOfReviews}>
        ({numberOfReviews})
      </span>
    </Box>
  );
}
