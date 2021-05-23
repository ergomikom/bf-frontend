import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  ButtonGroup,
} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import HelpIcon from '@material-ui/icons/Help';

const Item = props => <Grid item {...props} />;

const useStyles = makeStyles((theme) => ({
  button: {
    width: "20px",
  },
}));

const FieldItem = props => {
  const classes = useStyles();
  const { field, isFGSelected, selections } = props;
  const { fname, fr, dtdbtype } = field //f, fr, 
  const { selectedf, selectedfg } = selections;
  const { sfr } = selectedf;
  const { sFGtoUnlink } = selectedfg;

  const onSelectToUnlink = () => {
    const { field, selectionsChanges } = props;
    const { changeSF } = selectionsChanges;
    const { fname, f, fr, dt, dtdbtype } = field;
    changeSF({ sfname: fname, sf: f, sfr: fr, sdt: dt, sdtname: dtdbtype, sfEdit: false, sFInThisModel: true, sFtoUnlink: true });
  }

  const onCancelToUnlink = () => {
    const { selectionsChanges } = props;
    const { changeSF } = selectionsChanges;
    changeSF({ sfname: false, sf: false, sfr: false, sdt: false, sdtname: false, sfEdit: false, sFInThisModel: true, sFtoUnlink: false });
  }

  const isThisFieldSelected = (fr === Number.parseInt(sfr));
  const isFSelected = sfr ? true : false;
  const variant = isThisFieldSelected ? "contained" : "outlined";
  const disabled = isFSelected ? (fr === Number.parseInt(sfr)) ? false : true : false;

  const fieldName = isThisFieldSelected ? "to unlink: " + fname : fname;

  return (
    <Item xs={12} sm={12} md={12} lg={12} xl={12}>
      <ButtonGroup size="small" fullWidth color="primary" disabled={!isFGSelected || sFGtoUnlink}>
        <Button disabled={disabled} variant={variant} color="primary">{fieldName} - {dtdbtype}</Button>
        <Button disabled={disabled} variant={variant} color="primary" className={classes.button}><HelpIcon /></Button>
        {isFGSelected && !isThisFieldSelected ? (<Button disabled={disabled} className={classes.button} variant="contained" color="secondary" onClick={() => onSelectToUnlink()} ><LinkOffIcon /></Button>) : null}
        {isFGSelected && isThisFieldSelected ? (<Button disabled={disabled} className={classes.button} variant="contained" color="secondary" onClick={() => onCancelToUnlink()} ><LinkIcon /></Button>) : null}
      </ButtonGroup>
    </Item>
  );
}

export default FieldItem;
