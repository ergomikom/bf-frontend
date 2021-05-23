import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Grid,
  CircularProgress,
} from '@material-ui/core';


const Container = props => <Grid container {...props} />;
const Item = props => <Grid item {...props} />;

const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: 200,
    minHeight: 100,
  },
}));

const CircularProgressController = props => {
  const classes = useStyles();

  return (
    <Container alignItems="center" justify="center" className={classes.container}>
      <Item>
        <CircularProgress />
      </Item>
    </Container>
  );
}

export default CircularProgressController;
