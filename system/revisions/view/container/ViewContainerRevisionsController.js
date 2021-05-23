import React, { Component } from 'react';

import ViewError from '../../../../components/Error/ViewError';
import {
  CircularProgress,
} from '@material-ui/core';

import ViewContainerRevision from './ViewContainerRevision';

class ViewContainerRevisionsController extends Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  state = {
    error: false,
    errors: [],
    data: {},
    fetched: false,
    mid: false,
    mrid: false,
  }

  fetchViewContainerOptions = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    // headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  fetchViewContainerRevisions = (mid, mrid) => {
    const API = `/api/r/c/${mid}/${mrid}`;
    fetch(API, this.fetchViewContainerOptions)
      .then(response => response.json())
      .then(response => {
        if (response.errors !== undefined) {
          const errors = response.errors;
          // console.log(errors);
          this.setState({
            error: true,
            errors: errors,
          })
        } else if (response.data !== undefined) {
          const data = response.data;
          // console.log(response);
          this.setState({
            data: data,
            fetched: true,
            mid: mid,
            mrid: mrid,
          })
        } else {
          setTimeout(() => this.setState({
            error: true,
            errors: { fetch: { msg: "Fetching data error..." } },
          }), 1000);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentDidMount(props) {
    const { mid, mrid } = this.props;
    this.fetchViewContainerRevisions(mid, mrid);
  }

  render() {
    const { fetched, error, errors, data } = this.state;
    const { c, cr } = this.props;
    let view = null;
    if (fetched) {
      if (error) {
        view = <ViewError errors={errors} />
      } else {
        view = data.map(container =>
          (<ViewContainerRevision c={c} cr={cr} container={container} />)
        )
      }
    } else { view = <CircularProgress /> }

    return (
      <>
        {view}
      </>
    );
  }
}

export default ViewContainerRevisionsController;
