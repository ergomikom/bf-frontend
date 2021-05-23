import React from 'react';
import { makeStyles } from '@material-ui/styles';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

import ViewFieldRevisionRow from './ViewFieldRevisionRow';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  },
  card: {
    margin: theme.spacing(1)
  },
  table: {
    minWidth: 650,
  },
}));

const ViewFieldRevisionTable = props => {
  const classes = useStyles();
  const { data } = props;

  return (
      <TableContainer component={Paper}>
        <Table size="small" className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Hash</TableCell>
              <TableCell>Datatype</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <ViewFieldRevisionRow key={row.fr} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  )
};

export default ViewFieldRevisionTable;
