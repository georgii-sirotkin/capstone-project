import React from 'react';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

export default function RoomsTable({ rooms }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Beds</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((room, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {room.category}
              </TableCell>
              <TableCell>
                {room.numberOfBeds} {room.bedType} {room.numberOfBeds === 1 ? 'bed' : 'beds'}
              </TableCell>
              <TableCell align="right">{room.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
