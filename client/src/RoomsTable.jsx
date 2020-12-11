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
                {getBedsInfo(room)}
              </TableCell>
              <TableCell align="right">{room.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function getBedsInfo(room) {
  if (!room.numberOfBeds && !room.bedType) {
    return null;
  }

  if (!room.numberOfBeds) {
    return `${room.bedType} bed`;
  }

  const bedWord = room.numberOfBeds === 1 ? 'bed' : 'beds';

  if (!room.bedType) {
    return `${room.numberOfBeds} ${bedWord}`;
  }

  return `${room.numberOfBeds} ${room.bedType} ${bedWord}`;
}
