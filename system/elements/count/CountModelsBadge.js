import React from 'react';

import { Badge } from '@material-ui/core';
import AccountTreeIcon from '@material-ui/icons/AccountTree';


const CountModelsBadge = props => {
  const { count } = props;
  return (
    <Badge badgeContent={count} color="secondary" > <AccountTreeIcon color="primary" /></Badge >
  )
}

export default CountModelsBadge;