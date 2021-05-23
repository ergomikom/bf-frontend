import React, { Component } from 'react';

import FieldgroupNew from './fieldgroupNew';
import FieldgroupSelect from './fieldgroupSelect';
import FieldgroupSelectedView from './fieldgroupView/fieldgroupSelectedView';
import FieldgroupNewView from './fieldgroupView/fieldgroupNewView';

import {
  Grid,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
} from '@material-ui/core';

const Container = props => <Grid container {...props} />;
const Item = props => <Grid item {...props} />;

class FGController extends Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  state = {
    mode: false,
  }

  changeState = (mode) => {
    const { selectionsChanges } = this.props;
    const { changeSFG } = selectionsChanges;
    this.setState({
      mode: mode,
    })
    changeSFG({ sfgname: false, sfg: false, sfgr: false, sfgEdit: false, sFGInThisModel: false });
  }

  render() {
    const { errors, selections, selectionsChanges } = this.props;
    const { selectedfg } = selections;
    const { sfgname, sfg, sfgr } = selectedfg;
    const { mode } = this.state;
    // const error = errors ? true : false;

    //TODO: by nie dało się wybrać grupy istniejącej w modelu

    const newVariant = false === mode ? "contained" : "outlined";
    const selectVariant = true === mode ? "contained" : "outlined";
    const disableSelectedButton = (mode) ? true : false; //((!mode && sfgname && !sfg) || (mode && sfg && sfgr))
    const disableNewButton = (!mode) ? true : false;

    return (
      <Item xs={12} sm={12} md={12} lg={8} xl={4}>
        <Card >
          <CardHeader
            title="add a new group or find an existing one"
            subheader="and connect to the model"
          />
          <CardContent>
            <ButtonGroup size="small" fullWidth color="primary">

              <Button color="primary" disabled={disableNewButton} variant={newVariant} onClick={() => this.changeState(false)}>click to create a new one</Button>
              <Button color="secondary" disabled={disableSelectedButton} variant={selectVariant} onClick={() => this.changeState(true)}>click to find an existing one</Button>
            </ButtonGroup>

            <Container spacing={1} alignItems="center" justify="center">
              {!mode && !sfgname && !sfg ? <Item><FieldgroupNew selections={selections} selectionsChanges={selectionsChanges} errors={errors} /></Item> : null}

              {!mode && sfgname ? <FieldgroupNewView selections={selections} selectionsChanges={selectionsChanges} changeState={this.changeState} errors={errors} /> : null}

              {mode ? <Item><FieldgroupSelect changeState={this.changeState} selectionsChanges={selectionsChanges} /></Item> : null}

              {mode && sfg && sfgr ? <FieldgroupSelectedView errors={errors} selections={selections} selectionsChanges={selectionsChanges} changeState={this.changeState} /> : null}
            </Container>
          </CardContent>

        </Card>
      </Item>
    );
  }


};

export default FGController;
