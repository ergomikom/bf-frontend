import React from 'react';

import Dialog from '@material-ui/core/Dialog';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

// import FieldSelector from './fieldSelector/controller';

import Stage0 from './fieldSelectStages/stage0/controller';
import Stage1 from './fieldSelectStages/stage1/controller';

const useStyles = makeStyles({
  dialog: {
  },
});

const SelectField = props => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const [selectState, setSelectState] = React.useState(0);
  const [selected, setSelected] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const onChangeState = (selectedParam) => {
    const { selectionsChanges } = props;
    const { changeSF } = selectionsChanges;
    const { sf, sfr } = selectedParam;
    const newSelectState = sf ? sfr ? 2 : 1 : 0;
    setSelectState(newSelectState);
    setSelected(selectedParam);

    if (sf && sfr) {
      changeSF(selectedParam);
      setOpen(false);
    }
  }

  const handleCloseDialog = (value) => {
    const { selectionsChanges, changeState } = props;
    const { changeSF } = selectionsChanges;
    changeState(false);
    changeSF({ sfname: false, sf: false, sfr: false, sfEdit: false, sFInThisModel: false, });
    setOpen(false);
  }

  let stateToRender = null
  switch (selectState) {
    case 0:
      stateToRender = <Stage0 onChangeState={onChangeState} onCloseDialog={handleCloseDialog} />
      break;
    case 1:
      stateToRender = <Stage1 selected={selected} onChangeState={onChangeState} onCloseDialog={handleCloseDialog} />;
      break;
    default:
      stateToRender = null;
  }

  return (
    <>
      <Dialog className={classes.dialog} fullScreen={fullScreen} aria-labelledby="select-datatype" open={open}>
        {stateToRender}
      </Dialog>
    </>
  );
};

export default SelectField;