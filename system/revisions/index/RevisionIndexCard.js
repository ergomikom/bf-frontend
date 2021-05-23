import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

import {
  Grid,
  Card,
  CardHeader,
  Avatar,
  Typography,
} from '@material-ui/core';

import { red } from '@material-ui/core/colors';

const Item = props => <Grid item {...props} />;
const H6 = props => <Typography variant="h6" {...props} />;

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const RevisionIndexCard = props => {
  const {mid, index} = props;
  const classes = useStyles();
  console.log(index)
  const cards = index.map(card => {
    const { cr } = card;
    const revisionLink = `/model/${mid}/rev/${cr}`;
    return (
      <Item key={cr} xl={3} lg={4} md={5} sm={6} xs={12}>
        <Card>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                {mid}
              </Avatar>
            }
            title=<H6>#{cr}</H6>
            subheader=<NavLink to={revisionLink}>show details</NavLink>
          />
        </Card>
      </Item>
    )
  });

  return (
    <>
      {cards}
    </>
  );
}

export default RevisionIndexCard;