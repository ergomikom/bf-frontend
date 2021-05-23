import React from 'react';

import {
  Grid,
  Button,
  Typography,
} from '@material-ui/core';

const Container = props => <Grid container {...props} />;
const Item = props => <Grid item {...props} />;
const TITLE = props => <Typography color={props.error} variant="h2" {...props} />;
const SUBTITLE = props => <Typography color={props.error} variant="p" {...props} />;

const FieldgroupNewView = props => {

  const { selections, errors } = props;
  const { selectedfg } = selections
  const { sfgname } = selectedfg;

  const error = errors ? true : false;

  const clearSelectField = () => {
    const { selectionsChanges, changeState } = props;
    const { changeSFG } = selectionsChanges;
    changeSFG({ sfgname: false, sfg: false, sfgr: false, sfgEdit: false, sFGInThisModel: false });
    changeState(false);
  }

  return (
    <>
      <Container spacing={2} alignItems="center" justify="center">
        <Item>
          <TITLE error={error ? "secondary" : "primary"}>{sfgname}</TITLE>
        </Item>
        <Item>
          <Button size="small" color="secondary" variant="contained" onClick={clearSelectField} fullWidth>Unsubmit</Button>
        </Item>
      </Container>
      <Container spacing={2} alignItems="center" justify="center">
        <Item>
          <SUBTITLE error={error ? "secondary" : "primary"}>a new fieldgroup {sfgname} will be created</SUBTITLE>
        </Item>
      </Container>
    </>
  );
};

export default FieldgroupNewView;
