import React from 'react';

import {
  Grid,
  Button,
  Typography,
} from '@material-ui/core';

const Container = props => <Grid container {...props} />;
const Item = props => <Grid item {...props} />;
const TITLE = props => <Typography color={props.error} variant="h2" {...props} />;
const SUBTITLE = props => <Typography color={props.error} variant="h5" {...props} />;

const FieldgroupSelectedView = props => {

  const { selections, errors } = props;
  const { selectedfg } = selections;
  const { sfgname, sfg, sfgr, modelname, c, cr } = selectedfg;

  const error = errors ? true : false;

  const clearSelectField = () => {
    const { selectionsChanges, changeState } = props;
    const { changeSFG } = selectionsChanges;
    changeSFG({ sfgname: false, sfg: false, sfgr: false, sfgEdit: false, sFGInThisModel: false });
    changeState(false);
  }

  return (
    <>
      <Container spacing={1} alignItems="center" justify="center">
        <Item xs={5} sm={5} md={5} lg={5} xl={5}>
          <Container spacing={1} alignItems="center" justify="center">
            <Item>
              <TITLE error={error ? "secondary" : "primary"}>{sfgname}</TITLE>
            </Item>
          </Container>
        </Item>
        <Item xs={2} sm={2} md={2} lg={2} xl={2}>
          linked from
        </Item>
        <Item xs={5} sm={5} md={5} lg={5} xl={5}>
          <SUBTITLE>Model: {modelname}</SUBTITLE>
          <SUBTITLE>Model #id: {c}#{cr}</SUBTITLE>
          <SUBTITLE>Fieldgroup: {sfgname}</SUBTITLE>
          <SUBTITLE>Fieldgroup #id: {sfg}#{sfgr}</SUBTITLE>
        </Item>
        <Item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Button color="secondary" variant="contained" onClick={clearSelectField} fullWidth>Clear select</Button>
        </Item>
      </Container>
    </>
  );
};

export default FieldgroupSelectedView;
