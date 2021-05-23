import React from 'react';
import { makeStyles } from '@material-ui/styles';

import {
  Grid,
  Button,
} from '@material-ui/core';

import FieldGroups from '../fieldgroup/ViewFieldGroupsController'
import Status from './ViewContainerStatus'

const Container = props => <Grid container {...props} />;
const Item = props => <Grid item {...props} />;

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  },
  card: {
    margin: theme.spacing(1)
  }
}));

const ViewContainerRevision = props => {  
  const classes = useStyles();
  const { container } = props;
  const { c, cr, cc } = container;

  const linkFieldGroupInNewRevision = <Button fullWidth size="small" variant="contained" color="primary">Link fieldgroup and create new revision of current model</Button>

  const linkFieldGroupInCurrentRevision = <Button fullWidth size="small" variant="contained" color="primary">Link fieldgroup in current model</Button>

  const linkFieldGroup = cc ? linkFieldGroupInNewRevision : linkFieldGroupInCurrentRevision;

  

  return (
    <>
      <Item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Container>
          <Item>
            <Status container={container} />
          </Item>
        </Container>
      </Item>
      <Item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Container className={classes.root} >
          <Item xl={12} lg={12} md={12} sm={12} xs={12}>
            <FieldGroups mid={c} mrid={cr} />
          </Item>
        </Container>
        <Container className={classes.root} >
          <Item xl={12} lg={12} md={12} sm={12} xs={12}>
            {linkFieldGroup}
          </Item>
        </Container>

      </Item>
    </>
  )
};

export default ViewContainerRevision;
