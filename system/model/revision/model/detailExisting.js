import React from 'react';

import { NavLink } from 'react-router-dom';
import RefreshIcon from '@material-ui/icons/Refresh';

import {
  Grid,
  Button,
  Typography,
} from '@material-ui/core';

const Container = props => <Grid container {...props} />;
const Item = props => <Grid item {...props} />;
const TITLE = props => <Typography color={props.error} variant="h2" {...props} />;
const SUBTITLE = props => <Typography color={props.error} variant="h5" {...props} />;

const ModelView = props => {

  const { selections, errors, onResfresh } = props;
  const { selectedc } = selections;
  const { scname, sc, scr, } = selectedc;

  const error = errors ? true : false;

  const modelLink = `/model/${sc}`;

  return (
    <>
      <Container spacing={1} alignItems="center" justify="flex-start">
        {sc ? (<Item><Button variant="outlined"> <NavLink to={modelLink}>Go to revision list of model {scname}</NavLink></Button></Item>) : null}
      </Container>

      <Container spacing={1} alignItems="center" justify="center">
        <TITLE error={error ? "secondary" : "primary"}>{scname}</TITLE>
        <Button onClick={onResfresh}><RefreshIcon /></Button>
      </Container>

      <Container spacing={1} alignItems="center" justify="center">
        <SUBTITLE error={error ? "secondary" : "primary"}>this is the revision of the model <strong>{scname}</strong> number {sc}#{scr}</SUBTITLE>
      </Container>
    </>
  );
};

export default ModelView;
