import React from 'react';
import { Box, CircularProgress } from '@material-ui/core'

export default function LoadingContentProgress() {
  return (
    <Box
      display='flex'
      flexGrow='1'
      justifyContent='center'
      alignItems='center'
      width='100%'
      height='100%'
    >
      <CircularProgress />
    </Box>
  );
}
