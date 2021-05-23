import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import {
  DialogTitle,
  Dialog,
  DialogContent,
} from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const SelectDTDialog = props => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const { onClose, open } = props;

  const handleSelectDT = (dtName, dtId) => {
    onClose(dtName, dtId);
  };

  return (
    <Dialog fullScreen={fullScreen} aria-labelledby="select-datatype" open={open}>
      <DialogTitle id="simple-dialog-title">Select datatype for created field</DialogTitle>
      <DialogContent>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={classes.root}>
          <ListItem button>
            <ListItemText primary="BOOLEAN" onClick={() => handleSelectDT("Boolean", 1)} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="INTEGER" onClick={() => handleSelectDT("Integer", 8)} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="DECIMAL" onClick={() => handleSelectDT("Decimal", 12)} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="FLOAT" onClick={() => handleSelectDT("Float", 13)} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="DATETIME" onClick={() => handleSelectDT("Datetime", 15)} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="STRING" onClick={() => handleSelectDT("String", 16)} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="BINARY DATA" onClick={() => handleSelectDT("Binary data", 22)} />
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
}
export default SelectDTDialog;