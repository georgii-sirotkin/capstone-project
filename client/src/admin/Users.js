import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import { formatDistance } from 'date-fns';
import {
  Typography,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/admin/users')
      .then(response => {
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      })
  }, []);

  if (isLoading) {
    return <LoadingContentProgress />
  }

  if (!users) {
    return (
      <Box mt={3}>
        <Typography variant='h6'>Failed to load users.</Typography>
      </Box>)
    ;
  }

  const formattedUsers = users.map(user => ({
    ...user,
    role: user.isAdmin ? 'admin' : 'user',
  }));

  return (
    <>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        width='100%'
        mb={2}
      >
        <Typography variant='h4'>Users</Typography>
      </Box>
      <Box width='100%' position='relative'>
        <Box className={classes.tableContainer}>
          <MaterialTable
            icons={tableIcons}
            columns={getTableColumns()}
            data={formattedUsers}
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
      title: 'First Name',
      field: 'firstName',
    },
    {
      title: 'Last Name',
      field: 'lastName',
    },
    {
      title: 'Email',
      field: 'email',
    },
    {
      title: 'Role',
      field: 'role',
    },
    {
      title: 'Registered',
      field: 'createdAt',
      searchable: false,
      render: rowData => formatDistance(
        new Date(rowData.createdAt),
        new Date(),
        { addSuffix: true }
      ),
    },
  ];
}
