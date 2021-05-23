import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

// import FieldSelector from './fieldSelector/controller';

import Stage0 from './fieldgroupSelectStages/stage0/controller';
import Stage1 from './fieldgroupSelectStages/stage1/controller';

const useStyles = makeStyles({
  dialog: {
  },
});

const SelectFieldgroup = props => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const [selectState, setSelectState] = React.useState(0);
  const [selected, setSelected] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const onChangeState = (selectedParam) => {
    const { selectionsChanges } = props;
    const { changeSFG } = selectionsChanges;
    const { sfg, sfgr } = selectedParam;
    const newSelectState = sfg ? sfgr ? 2 : 1 : 0;
    setSelectState(newSelectState);
    setSelected(selectedParam);

    if (sfg && sfgr) {
      changeSFG(selectedParam);
      setOpen(false);
    }
  }

  const handleCloseDialog = (value) => {
    const { selectionsChanges, changeState } = props;
    const { changeSFG } = selectionsChanges;
    changeState(false);
    changeSFG({ sfgname: false, sfg: false, sfgr: false, sfgEdit: false, sFGInThisModel: false, });
    setOpen(false);
  }

  let stateToRender = null
  switch (selectState) {
    case 0:
      stateToRender = <Stage0 onChangeState={onChangeState} />
      break;
    case 1:
      stateToRender = <Stage1 selected={selected} onChangeState={onChangeState} />;
      break;
    default:
      stateToRender = null;
  }

  return (
    <>
      <Dialog className={classes.dialog} fullScreen={fullScreen} aria-labelledby="select-datatype" open={open}>
        <DialogActions>
          <Button onClick={handleCloseDialog}><CloseIcon /></Button>
        </DialogActions>
        {stateToRender}
      </Dialog>
    </>
  );
};

export default SelectFieldgroup;