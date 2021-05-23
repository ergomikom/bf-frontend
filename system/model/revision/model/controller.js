import React from 'react';

import ModelNew from './new';
import DetailExisting from './detailExisting';
import DetailNoexistent from './detailNonexistent';


import {
  Grid,
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';

const Item12 = props => <Grid xs={12} sm={12} md={12} lg={12} xl={12} item {...props} />;

const ModelController = props => {

  const { selections, errors, selectionsChanges, onResfresh } = props;
  const { selectedc } = selections;
  const { scname, sc, scr, scEdit } = selectedc;

  // const error = errors ? true : false;

  return (
    <>
      {((!scname) || scEdit) ? (<Item12><Card >
        <CardHeader
          title="you will create a new model"
          subheader="first, enter the name of the newly created model"
        />
        <CardContent><ModelNew errors={errors} selections={selections} selectionsChanges={selectionsChanges} /></CardContent></Card></Item12>) : null}

      {(scname && sc && scr && !scEdit) ? <Item12><DetailExisting selections={selections} errors={errors} selectionsChanges={selectionsChanges} onResfresh={onResfresh} /></Item12> : null}

      {(!sc && !scr && scname && !scEdit) ? <Item12><DetailNoexistent selections={selections} errors={errors} selectionsChanges={selectionsChanges} /></Item12> : null}

    </>
  );
};

export default ModelController;
