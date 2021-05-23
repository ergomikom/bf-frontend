import React from 'react';
// import { NavLink, Route, Switch } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';

import {
  Grid,
  FormControl,
  InputLabel,
  Input,
} from '@material-ui/core';


const Container = props => <Grid container {...props} />;
const Item = props => <Grid item {...props} />;

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     padding: '30px 20px',
//   },
// }));

const handleSubmit = (e) => {
  e.preventDefault();
}

const ElementIndexSearchForm = props => {
  // const classes = useStyles();
  const { icon, error, change } = props;
  return (
    <Container spacing={2}>
      <Item lg={12} xl={12} md={12} sm={12} xs={12}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Container spacing={2} alignItems="center" justify="flex-start">
              <Item>
                {icon}
              </Item>
              <Item>
                <FormControl>
                  <InputLabel htmlFor="contain">Search by name</InputLabel>
                  <Input fullWidth error={error} id="contain" aria-describedby="containHelper" onChange={change} variant="filled" type="search" />
                </FormControl>
              </Item>
            </Container>
          </form>
        
      </Item>
    </Container>
  );
}

export default ElementIndexSearchForm;
