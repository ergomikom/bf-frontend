import React from 'react';

import {
  Typography,
} from '@material-ui/core';
import CountRevision from '../../../revisions/count/CountRevisionController';

const H4 = props => <Typography color="primary" variant="h4" {...props} />;


const ViewContainer = props => {
  const { mid, name } = props;
  return (
    <H4>MODEL ST: {name}
      <CountRevision type="c" mid={mid} />
    </H4>
  );
}

export default ViewContainer;