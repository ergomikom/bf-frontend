import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

import {
  Card,
  CardHeader,
  Avatar,
  Typography,
} from '@material-ui/core';

import { red } from '@material-ui/core/colors';
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

const ViewContainer = props => {
  const classes = useStyles();
  const { mid, name } = props;
  const firstLetter = name.charAt(0);
  const containerLink = 'model/' + mid;
  return (
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {firstLetter}
            </Avatar>
          }
          title=<H6>{name}</H6>
            subheader=<NavLink to={containerLink}>show more</NavLink>
          />
      </Card>
  );
}

export default ViewContainer;