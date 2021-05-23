import React, { Component } from 'react';

import Fieldgroup from './fieldgroup';

import {
  CircularProgress,
} from '@material-ui/core';

class FieldgroupsController extends Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  state = {
    fieldgroups: false,
    fetched: false,
    errors: false,
  }

  fetchDataOptions = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    // headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  fetchData = (sc, scr) => {
    const API = `/api/r/fgs/${sc}/${scr}`;
    fetch(API, this.fetchDataOptions)
      .then(response => response.json())
      .then(response => {
        if (response.status) {
          // console.log(response.data)
          this.setState({
            errors: false,
            fieldgroups: response.data,
            fetched: true,
          });
        } else {
          this.setState({
            errors: response.data,
            fieldgroups: false,
            fetched: true,
          });
        }
      })
      .catch(e => {
        //TODO: inject component to send error data
        console.log(e)
      })
  }

  onResfresh = () => {
    const { selections } = this.props;
    const { selectedc } = selections;
    const { sc, scr } = selectedc;
    this.fetchData(sc, scr);
  }

  componentDidMount(props) {
    const { selections } = this.props;
    const { selectedc } = selections;
    const { sc, scr } = selectedc;
    this.fetchData(sc, scr);
  }

  render() {
    const { fieldgroups, fetched, errors } = this.state;
    const { onReloadedFG, toReloadFG, selections, selectionsChanges } = this.props;
    const error = errors ? true : false;

    return (
      <>
        {fetched && fieldgroups && !error ? <Fieldgroups onReloadedFG={onReloadedFG} toReloadFG={toReloadFG} fieldgroups={fieldgroups} selections={selections} selectionsChanges={selectionsChanges} /> : <CircularProgress />}
        {error ? <p>ERROR</p> : null}
      </>
    );
  }
}

export default FieldgroupsController;

const Fieldgroups = props => {
  const { onReloadedFG, toReloadFG, fieldgroups, selections, selectionsChanges } = props;
  const { selectedfg } = selections;
  const { sfg, sfgr } = selectedfg;

  let fieldgroupsList = [];
  if (sfg) {
    fieldgroupsList = fieldgroups.filter(fieldgroup => {
      const { fg, fgr } = fieldgroup;
      return fg === sfg && fgr === sfgr;
    });
  } else {
    fieldgroupsList = fieldgroups;
  }

  return fieldgroupsList.map(fieldgroup => {
    const { fgr } = fieldgroup;
    return <Fieldgroup key={fgr} onReloadedFG={onReloadedFG} toReloadFG={toReloadFG} selections={selections} selectionsChanges={selectionsChanges} fieldgroup={fieldgroup} />
  });

}