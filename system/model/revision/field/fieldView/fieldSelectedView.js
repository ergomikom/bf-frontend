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

const FieldSelectedView = props => {

  const { selections, errors } = props;
  const { selectedf } = selections;
  const { sfname, sf, sfr, sdtname, modelname, c, cr, fieldgroupname, fg, fgr } = selectedf;

  const error = errors ? true : false;

  const clearSelectField = () => {
    const { selectionsChanges, changeState } = props;
    const { changeSF } = selectionsChanges;
    changeSF({ sfname: false, sf: false, sfr: false, sdt: false, sdtname: false, sfEdit: false, sFInThisModel: false });
    changeState(false);
  }

  return (
    <>
      <Container spacing={1} alignItems="center" justify="center">
        <Item xs={5} sm={5} md={5} lg={5} xl={5}>
          <Container spacing={1} alignItems="center" justify="center">
            <Item>
              <TITLE error={error ? "secondary" : "primary"}>{sfname}</TITLE>
              <SUBTITLE>Datatype: {sdtname}</SUBTITLE>
            </Item>
          </Container>
        </Item>
        <Item xs={2} sm={2} md={2} lg={2} xl={2}>
          linked from
        </Item>
        <Item xs={5} sm={5} md={5} lg={5} xl={5}>
          <SUBTITLE>Model: {modelname}</SUBTITLE>
          <SUBTITLE>Model #id: {c}#{cr}</SUBTITLE>
          <SUBTITLE>Fieldgroup: {fieldgroupname}</SUBTITLE>
          <SUBTITLE>Fieldgroup #id: {fg}#{fgr}</SUBTITLE>
          <SUBTITLE>Field: {sfname}</SUBTITLE>
          <SUBTITLE>Field #id: {sf}#{sfr}</SUBTITLE>
        </Item>
        <Item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Button color="secondary" variant="contained" onClick={clearSelectField} fullWidth>Unselect</Button>
        </Item>
      </Container>
    </>
  );
};

export default FieldSelectedView;
