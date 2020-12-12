import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete'

export default function Search({ initialValue, isLoading, onSearch }) {
  const [value, setValue] = useState(initialValue);
  const [cities, setCities] = useState([]);
  const searchOptions = cities.map(city => city.name);

  useEffect(() => {
    axios.get('/api/cities')
      .then(response => {
        setCities(response.data);
      });
  }, []);

  return (
    <Box display='flex' p={2} alignItems='flex-end'>
      <Autocomplete
        disableClearable
        fullWidth
        freeSolo
        options={searchOptions}
        value={value}
        onInputChange={(event, newValue) => setValue(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Destination"
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
      <Box ml={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onSearch(value)}
          disabled={isLoading}
          disableElevation
        >
          Search
        </Button>
      </Box>
    </Box>
  );
}
