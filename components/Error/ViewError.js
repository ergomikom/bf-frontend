import React from 'react';

import {
  // Grid,
} from '@material-ui/core';


const ErrorsList = (errors) => {
  const errorsArray = errors.errors;
  for (let key of Object.keys(errorsArray)) {
    console.log(key)    
  }

  return <div>TEST!</div>;
}

const ViewError = props => {
  const { errors } = props;
  return (
    <ErrorsList errors={errors} />
  )
}

export default ViewError;
