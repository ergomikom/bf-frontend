import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {
  Grid,
} from '@material-ui/core';

import Field from './field';
import Circular from '../../../../../components/CircularProgressController/CircularProgressController';

const Container = props => <Grid container {...props} />;

const useStyles = makeStyles({
  table: {
    minWidth: 350,
  },
});

const FieldList = (props) => {
  const classes = useStyles();

  const { fields, changeSelected } = props;

  let renderedFields = null;

  if (fields && Array.isArray(fields)) {
    renderedFields = fields.map(field => {
      const { f } = field;
      return <Field key={f} changeSelected={changeSelected} field={field} />
    });
  }
  const isArray = Array.isArray(renderedFields);
  const tableBody = isArray ? renderedFields.length ? renderedFields : "no data for this filter" : null;
  const result = isArray ? tableBody : null;
  const waiter = isArray && tableBody ? null : <Circular size={40} />;

  return (
    <>
      {isArray ? (

        <Container spacing={1} alignItems="center" justify="center">
          <TableContainer>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Field name</TableCell>
                  <TableCell align="center">Data type name</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result}
              </TableBody>

            </Table>
          </TableContainer>
          {waiter}
        </Container>

      ) : null}</>
  )
}

export default FieldList;