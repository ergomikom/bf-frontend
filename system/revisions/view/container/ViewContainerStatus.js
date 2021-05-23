import React from 'react';

import {
  Button,
} from '@material-ui/core';

const ViewContainerStatus = props => {
  const { container } = props;
  const { cc, cu } = container;

  let status = "";
  if (cc) {
    if (cu) {
      status = <Button color="primary">Model is used.</Button>
    } else {
      status = <Button variant="contained" color="secondary">Model confirmed. Click to unconfirm.</Button>
    }
  } else {
    status = <Button variant="contained" color="primary">Model is valid. Click to confirm and create model</Button>;
  }

  return (
    <>
      {status}
    </>
  )
};

export default ViewContainerStatus;
