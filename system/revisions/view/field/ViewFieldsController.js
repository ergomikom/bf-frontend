import React, { Component } from 'react';
import ViewError from '../../../../components/Error/ViewError';
import {
  CircularProgress,
} from '@material-ui/core';

import ViewFieldRevisionTable from './ViewFieldRevisionTable';

class ViewFieldsController extends Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  state = {
    error: false,
    errors: [],
    data: {},
    fetched: false,
    fieldgroup: null,
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

  fetchData = (mid, mrid) => {
    const API = `/api/r/fs/${mid}/${mrid}`;
    fetch(API, this.fetchDataOptions)
      .then(response => response.json())
      .then(response => {
        if (response.errors !== undefined) {
          const errors = response.errors;
          // console.log(errors)
          this.setState({
            error: true,
            errors: errors,
          })
        } else if (response.data !== undefined) {
          const data = response.data;
          // console.log(response)
          this.setState({
            data: data,
            fetched: true,
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
    const { fieldgroup } = this.props;
    const { fg, fgr } = fieldgroup;
    this.setState({
      fieldgroup: fieldgroup,
    });
    this.fetchData(fg, fgr);
  }

  render() {
    const { fetched, error, errors, data, fieldgroup } = this.state;

    let view = null;
    if (fetched) {
      if (error) {
        view = <ViewError errors={errors} />
      } else {
        view = (<ViewFieldRevisionTable fieldgroup={fieldgroup} data={data} />)
      }
    } else {
      view = <CircularProgress />
    }

    return (
      <>
        {view}
      </>
    );
  }
}

export default ViewFieldsController;
