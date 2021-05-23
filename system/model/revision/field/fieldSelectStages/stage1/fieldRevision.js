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
  const { selected, revision, onSelectField } = props;
  const { modelname, fieldgroupname, c, cr, fg, fgr, fr } = revision;
  const { sfname, sf, sdt, sdtname } = selected;

  const title = `field in model ${modelname} [${c}#${cr}]`;
  const subheader = `fieldgroup: ${fieldgroupname} [${fg}#${fgr}]`;
  const buttonText = `Link field ${sfname}/${sdtname} to model`;

  const onSelect = () => {
    const selectedFieldRevision = { sfname, sf, sfr: fr, sdt, sdtname, sfEdit: false, sFInThisModel: false, modelname, c, cr, fieldgroupname, fg, fgr };
    onSelectField(selectedFieldRevision);
  }

  return (
    <Item xs={6} sm={6} md={4} lg={4} xl={3}>
      <Card className={classes.card}>
        <CardHeader
          title={title}
          subheader={subheader}
        />
        <CardContent>
          <Button fullWidth variant="outlined" color="secondary" onClick={onSelect} >{buttonText}</Button>
        </CardContent>
      </Card>
    </Item>
  );
}

export default FieldRevision;