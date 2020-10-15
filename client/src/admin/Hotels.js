import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import { formatDistance } from 'date-fns';
import {
  Typography,
  Button,
  Box,
  Link,
} from '@material-ui/core';
import { AddOutlined as AddOutlinedIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import LoadingContentProgress from '../LoadingContentProgress';
import tableIcons from '../helpers/tableIcons';

const useStyles = makeStyles(theme => ({
  tableContainer: {
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    paddingBottom: theme.spacing(2),
  }
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
    <>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        width='100%'
        mb={2}
      >
        <Typography variant='h4'>Hotels</Typography>
        <Button
          variant='outlined'
          color='primary'
          component={RouterLink}
          startIcon={<AddOutlinedIcon />}
          to='/admin/hotels/create'
        >
          Add hotel
        </Button>
      </Box>
      <Box width='100%' position='relative'>
        <Box className={classes.tableContainer}>
          <MaterialTable
            icons={tableIcons}
            columns={getTableColumns()}
            data={hotels}
            options={{
              cellStyle: {
                whiteSpace: 'nowrap',
              },
              showTitle: false,
            }}
          />
        </Box>
      </Box>
    </>
  );
};

function getTableColumns() {
  return [
    {
      title: 'Name',
      field: 'name',
      render: rowData => (
        <Link
          component={RouterLink}
          to={`/admin/hotels/${rowData.id}`}
        >
          {rowData.name}
        </Link>
      ),
    },
    {
      title: 'Phone',
      field: 'phone',
    },
    {
      title: 'Website',
      field: 'website',
      render: rowData => (
        <Link to={rowData.website}>
          {rowData.website}
        </Link>
      ),
    },
    {
      title: 'Last updated',
      field: 'updatedAt',
      searchable: false,
      render: rowData => formatDistance(
        new Date(rowData.updatedAt),
        new Date(),
        { addSuffix: true }
      ),
    },
  ];
}
