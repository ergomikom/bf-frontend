import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Paper,
  Grid,
  Divider,
  Typography,
} from '@material-ui/core';

import CreateContainerFormController from './CreateContainerFormController';

const Container = props => <Grid container {...props} />;
const Item = props => <Grid item {...props} />;
const H4 = props => <Typography color="primary" variant="h4" {...props} />;

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '50px 20px',
  },
}));

const CreateContainerCard = props => {
  const classes = useStyles();
  return (
    <Container spacing={2}>
      <Item lg={12} xl={12} md={12} sm={12} xs={12}>
        <H4>Create new container</H4>
        <Divider />
          <Paper variant="outlined" square className={classes.paper}>
            <CreateContainerFormController />
          </Paper>
      </Item>
    </Container>
  )
}

export default CreateContainerCard;
