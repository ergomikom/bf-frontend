import React from 'react';
// import { NavLink, Route, Switch } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';

import {
  TextField,
} from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     padding: '30px 20px',
//   },
// }));

const ElementIndexSearchForm = props => {
  // const classes = useStyles();
  const { title, error, change, contain } = props;

  return (
    <>
      <TextField label={title} fullWidth error={error} id="outlined" aria-describedby="containHelper" onChange={change} variant="filled" type="search" defaultValue={contain} />
    </>
  );
}

export default ElementIndexSearchForm;
