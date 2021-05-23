import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import {
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions,
  Fab,
  Tooltip,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import CreateForm from '../../../elements/container/create/CreateContainerFormController'

const useStyles = makeStyles(theme => ({
  absolute: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

const CreateContainerDialog = props => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const { onClose, open, onRefresh } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog fullScreen={fullScreen} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Create new model</DialogTitle>
      <DialogContent>
        <CreateForm onRefresh={onRefresh} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
          </Button>
      </DialogActions>
    </Dialog>
  );
}

const CreateContainerDialogController = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const { onRefresh } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Add model" aria-label="add model">
        <Fab color="secondary" className={classes.absolute} onClick={handleClickOpen} >
          <AddIcon></AddIcon>
        </Fab>
      </Tooltip>
      <CreateContainerDialog onRefresh={onRefresh} open={open} onClose={handleClose} />
    </>
  );
}

export default CreateContainerDialogController;
