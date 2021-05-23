import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import InputController from '../../../../../../components/InputController/InputController';

const useStyles = makeStyles({
  form: {
    minWidth: 350,
  },
});

const SearchForm = props => {
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  const { change, contain } = props;
  return (
    <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <InputController contain={contain} change={change} title="Search field by name" />
    </form>
  );
}

export default SearchForm;

