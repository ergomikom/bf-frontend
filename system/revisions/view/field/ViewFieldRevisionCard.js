import React from 'react';
import { makeStyles } from '@material-ui/styles';

import {
  Grid,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@material-ui/core';

import ViewDataType from '../datatype/ViewDataTypeController';

const Container = props => <Grid container {...props} />;
const Item = props => <Grid item {...props} />;

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  },
  card: {
    margin: theme.spacing(1)
  }
}));

const ViewFieldRevision = props => {
  const classes = useStyles();
  const { field } = props;
  const { name, f, fr, fu, dt } = field;

  const title = `FIELD: ${name} - ${f}#${fr}`;

  const unlinkField = fu ? null : <Button size="small" variant="contained" color="secondary">Unlink field</Button>;
  const unlinkDataType = <Button size="small" variant="contained" color="secondary">Unlink datatype</Button>;
  const linkDataType = <Button fullWidth size="small" variant="contained" color="primary">Link datatype</Button>;

  const unlinkDataTypeButton = dt ? unlinkDataType : null;
  const linkDataTypeButton = dt ? null : linkDataType;

  return (
    <Item xl={3} lg={4} md={6} sm={12} xs={12} >
      <Card raised={true} className={classes.card}>
        <CardHeader title={title} />
        <CardContent>
          <Container className={classes.card}>
            {dt ? <ViewDataType field={field} /> : linkDataTypeButton}
          </Container>
        </CardContent>
        <CardActions>
          {unlinkField} {unlinkDataTypeButton}
        </CardActions>
      </Card>
    </Item>
  )
};

export default ViewFieldRevision;
