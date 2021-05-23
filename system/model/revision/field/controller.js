import React, { Component } from 'react';

import FieldNew from './fieldNew';
import FieldSelect from './fieldSelect';
import FieldSelectedView from './fieldView/fieldSelectedView';
import FieldNewView from './fieldView/fieldNewView';

import {
  Grid,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
} from '@material-ui/core';
// import LinkIcon from '@material-ui/icons/Link';

const Container = props => <Grid container {...props} />;
const Item = props => <Grid item {...props} />;

class FController extends Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  state = {
    mode: false,
  }

  changeState = (mode) => {
    const { selectionsChanges } = this.props;
    const { changeSF } = selectionsChanges;
    this.setState({
      mode: mode,
    })
    changeSF({ sfname: false, sf: false, sfr: false, sdt: false, sdtname: false, sfEdit: false, sFInThisModel: false });
  }

  render() {
    const { errors, selections, selectionsChanges } = this.props;
    const { selectedf } = selections;
    const { sfname, sdt, sf, sfr } = selectedf; // sFtoUnlink
    const { mode } = this.state;
    // const error = errors ? true : false;

    const newVariant = false === mode ? "contained" : "outlined";
    const selectVariant = true === mode ? "contained" : "outlined";
    const disableSelectedButton = ((!mode && sfname && sdt) || (mode && sf && sfr)) ? true : false;

    return (
      <Item xs={12} sm={6} md={6} lg={6} xl={4}>
        <Card >
          <CardHeader
            title="add a new field or find an existing one"
            subheader="and connect to the fieldgroup"
          />
          <CardContent>
            <ButtonGroup size="small" fullWidth color="primary">

              <Button color="primary" disabled={disableSelectedButton} variant={newVariant} onClick={() => this.changeState(false)}>click to create new one</Button>
              <Button color="secondary" disabled={disableSelectedButton} variant={selectVariant} onClick={() => this.changeState(true)}>click to find an existing one</Button>
            </ButtonGroup>

            <Container spacing={1} alignItems="center" justify="center">
              {!mode && !sfname && !sdt ? <Item><FieldNew errors={errors} selections={selections} selectionsChanges={selectionsChanges} /></Item> : null}

              {!mode && sfname && sdt ? <FieldNewView errors={errors} selections={selections} selectionsChanges={selectionsChanges} changeState={this.changeState} /> : null}

              {mode ? <Item><FieldSelect changeState={this.changeState} selectionsChanges={selectionsChanges} /></Item> : null}

              {mode && sf && sfr ? <FieldSelectedView errors={errors} selections={selections} selectionsChanges={selectionsChanges} changeState={this.changeState} /> : null}
            </Container>
          </CardContent>

        </Card>
      </Item>
    );
  }


};

export default FController;
