import React from 'react';
import { makeStyles } from '@material-ui/styles';

import {
  TableCell,
  TableRow,
  Button,
  Chip,
} from '@material-ui/core';

import InsertLinkIcon from '@material-ui/icons/InsertLink';

const useStyles = makeStyles(theme => ({
}));

const ViewFieldRevisionRow = props => {
  const classes = useStyles();
  const { row } = props;
  const { fr, name, datatype } = row;

  const dataTypeName = datatype ? datatype.datatypeName : "no datatype assigned";
 

  const linkDataTypeButton = (<Button variant="contained" color="primary" size="small" className={classes.button} startIcon=<InsertLinkIcon /> > Link datatype</Button>);

  const unlinkDataTypeButton = (<Button variant="contained" color="secondary" className={classes.button} startIcon=<InsertLinkIcon /> size="small"> Unlink {dataTypeName}</Button>);

  const dataTypeAction = datatype ? unlinkDataTypeButton : linkDataTypeButton;

  return (
    <TableRow key={fr}>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell>{fr}</TableCell>
      <TableCell><Chip label={dataTypeName}/>{dataTypeAction}</TableCell>

    </TableRow>

  )
};

export default ViewFieldRevisionRow;
