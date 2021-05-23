import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Grid,
  Button,
  Card,
  CardContent,
  CardHeader,
} from '@material-ui/core';

// import Fields from '../../../fields/controller';

const Item = props => <Grid item {...props} />;

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: "150px",
  },
}));


const Fieldgroup = props => {
  const classes = useStyles();
  const { fieldgroup, onSelectFieldgroup } = props;
  const { fgname, fg } = fieldgroup;

  const onSelect = () => {
    onSelectFieldgroup({ sfgname: fgname, sfg: fg, sfgr: false, sfgEdit: false, sFGInThisModel: false })
  }

  return (
    <Item xs={6} sm={6} md={6} lg={6} xl={3}>
      <Card className={classes.card}>
        <CardHeader
          title={fgname}
        />
        <CardContent>
          <Button fullWidth variant="outlined" color="secondary" onClick={onSelect} >Select fieldgroup</Button>
        </CardContent>
      </Card>
    </Item>
  );
}

export default Fieldgroup;
