import React, { Component } from 'react';

import Field from './field';

import {
  Grid,
  CircularProgress,
} from '@material-ui/core';

const Container = props => <Grid container {...props} />;

class FSController extends Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  state = {
    errors: false,
    fields: false,
    fetched: false,
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

  fetchData = async (fg, fgr) => {
    const API = `/api/r/fs/${fg}/${fgr}`;
    await fetch(API, this.fetchDataOptions)
      .then(response => response.json())
      .then(response => {
        if (response.status) {
          this.setState({
            errors: false,
            fields: response.data,
            fetched: true,
            toUpdate: false,
          });
        } else {
          this.setState({
            errors: response.data,
            data: false,
            fetched: true,
            toUpdate: false,
          });
        }
      })
      .catch(e => {
        //TODO: inject component to send error data
        console.log(e)
      })
  }

  componentDidMount(props) {
    const { fieldgroup } = this.props;
    const { fg, fgr } = fieldgroup;
    this.fetchData(fg, fgr);
  }

  componentDidUpdate(props) {
    const { onReloadedFG, toReloadFG, fieldgroup } = this.props;
    const { sfg, sfgr } = toReloadFG;
    const { fg, fgr } = fieldgroup;
    if (sfg === fg && sfgr === fgr) {
      onReloadedFG()
      this.fetchData(fg, fgr);
    }
  }

  render() {
    //TODO: 
    const { fetched, errors, fields } = this.state;
    const error = errors ? true : false;
    const { isFGSelected, selections, selectionsChanges } = this.props;

    return (
      <>
        {fetched && fields && !error ? <Fields selections={selections} selectionsChanges={selectionsChanges} isFGSelected={isFGSelected} fields={fields} /> : <CircularProgress />}
        {error ? <p>ERROR</p> : null}
      </>
    );
  }
}

export default FSController;

const Fields = props => {
  const { fields } = props;

  const fieldPrerenderList = fields.map(field => {
    const { fr } = field;
    const { selections, selectionsChanges, isFGSelected } = props;

    return <Field selections={selections} selectionsChanges={selectionsChanges} key={fr} field={field} isFGSelected={isFGSelected} />
  });

  return (
    <Container spacing={1} alignItems="stretch" justify="space-evenly">
      {fieldPrerenderList}
    </Container>
  );

}