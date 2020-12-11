import React from 'react';
import {
  Typography,
  Box,
  Divider,
  Slider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { formatPrice } from './helpers/functions'

const useStyles = makeStyles(theme => ({
  bold: {
    fontWeight: 500,
  },
  section: {
    padding: theme.spacing(2, 2, 1.5, 2),
  },
  priceRangeText: {
    fontWeight: 500,
    fontSize: 13,
  }
}));

export default function FiltersBlock({
  priceRange,
  onPriceRangeChange,
  numberOfHotels,
  isLoadingHotels,
}) {
  const classes = useStyles();

  function handlePriceRangeChange(event, newValue) {
    onPriceRangeChange(newValue);
  }

  const priceRangeText = formatPrice(priceRange[0]) + ' to ' + formatPrice(priceRange[1]);

  return (
    <Box bgcolor='grey.200' height='100%'>
      <div className={classes.section}>
        <Typography variant='subtitle1' className={classes.bold}>
          Narrow results:
        </Typography>
        <Typography variant='body2'>
          {isLoadingHotels ? 'Loading hotels' : `${numberOfHotels} hotels`}
        </Typography>
      </div>
      <Divider />
      <div className={classes.section}>
        <Typography variant='subtitle2'>
          Nightly Price
        </Typography>
        <Box mt={2} px={1}>
          <Typography
            align='center'
            variant='caption'
            className={classes.priceRangeText}
            component='div'
          >
            {priceRangeText}
          </Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceRangeChange}
            max={1000}
          />
        </Box>
      </div>
    </Box>
  );
}
