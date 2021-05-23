import React from 'react';
import { Grid } from '@material-ui/core';

const Minimal = props => {
  const { children } = props;

  return (
    <Grid container>
      {children}
    </Grid>
  );
};

export default Minimal;
