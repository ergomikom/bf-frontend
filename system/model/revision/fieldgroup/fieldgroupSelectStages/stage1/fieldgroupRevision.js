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


const FieldRevision = props => {
  const classes = useStyles();
  const { selected, revision, onSelectFieldgroup } = props;
  const { modelname, c, cr, fgr } = revision;
  const { sfgname, sfg } = selected;

  const title = `field in model ${modelname} [${c}#${cr}]`;
  // const subheader = `fieldgroup: ${fieldgroupname} [${fg}#${fgr}]`;
  const buttonText = `Link field ${sfgname} to model`;

  const onSelect = () => {
    const selectedFieldgroupRevision = { sfgname, sfg, sfgr: fgr, sfgEdit: false, sFGInThisModel: false, modelname, c, cr };
    onSelectFieldgroup(selectedFieldgroupRevision);
  }

  return (
    <Item xs={6} sm={6} md={4} lg={4} xl={3}>
      <Card className={classes.card}>
        <CardHeader
          title={title}
          // subheader={subheader}
        />
        <CardContent>
          <Button fullWidth variant="outlined" color="secondary" onClick={onSelect} >{buttonText}</Button>
        </CardContent>
      </Card>
    </Item>
  );
}

export default FieldRevision;