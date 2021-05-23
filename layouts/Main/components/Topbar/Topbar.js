import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  // const [notifications] = useState([]);

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <div className={classes.flexGrow} />

        <IconButton color="inherit" onClick={onSidebarOpen} >
          <MenuIcon />
        </IconButton>

      </Toolbar>

    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
