import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Grid,
  Button,
  Card,
  CardContent,
  CardHeader,
} from '@material-ui/core';

const Item = props => <Grid item {...props} />;

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: "150px",
  },
}));


const Field = props => {
  const classes = useStyles();
  const { field, onSelectField } = props;
  const { fname, f, dtid, dtdbtype, dtdbname } = field;
  const subheader = `${dtdbtype}/${dtdbname}`;

  const onSelect = () => {
    onSelectField({ sfname: fname, sf: f, sfr: false, sdt: dtid, sdtname: dtdbname, sfEdit: false, sFInThisModel: false })
  }

  return (
    <Item xs={6} sm={6} md={4} lg={4} xl={3}>
      <Card className={classes.card}>
        <CardHeader
          title={fname}
          subheader={subheader}
        />
        <CardContent>
          <Button fullWidth variant="outlined" color="secondary" onClick={onSelect} >Select field</Button>
        </CardContent>
      </Card>
    </Item>
  );
}

export default Field;
