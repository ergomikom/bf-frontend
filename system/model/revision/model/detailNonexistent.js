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

const ModelView = props => {

  const { selections, errors } = props;
  const { selectedc } = selections;
  const { scname, scEdit } = selectedc;

  const error = errors ? true : false;

  const onUnsubmit = () => {
    const { selectionsChanges, selections } = props;
    const { selectedc } = selections;
    const { scname } = selectedc;
    const { changeSC } = selectionsChanges;
    changeSC({ scname: scname, sc: false, scr: false, scc: false, scu: false, scEdit: true, sCInThisModel: false })
  }

  return (
    <>
      <Container spacing={2} alignItems="center" justify="center">
        <Item>
          <TITLE error={error ? "secondary" : "primary"}>{scname}</TITLE>
        </Item>
        <Item>
          {!scEdit ? <Button size="small" variant="contained" color="secondary" onClick={onUnsubmit}>Unsubmit</Button> : null}
        </Item>
        <Item>
          <SUBTITLE error={error ? "secondary" : "primary"}>a new model {scname} will be created</SUBTITLE>
        </Item>
      </Container>

    </>
  );
};

export default ModelView;
