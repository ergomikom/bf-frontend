import React, { Component } from 'react';

// import ViewError from '../../../../components/Error/ViewError';
import ViewElement from './HeaderCardView';
import { CircularProgress } from '@material-ui/core';

class ViewContainerController extends Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  state = {
    error: false,
    errors: [],
    data: {},
    fetched: false,
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

  fetchViewContainer = (mid) => {
    const API = `/api/c/c/${mid}`;
    fetch(API, this.fetchViewContainerOptions)
      .then(response => response.json())
      .then(response => {
        if (response.errors !== undefined) {
          const errors = response.errors;
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
    const { mid } = this.props;
    this.fetchViewContainer(mid);
  }

  render() {
    // console.log(this.state);
    const { fetched, error, data } = this.state;
    const mid = data.MID;
    const name = data.MNAME;
    let view = null;
    if (fetched) {
      if (error) {
        // view = <ViewError errors={errors} />
      } else { view = (<ViewElement mid={mid} name={name} />) }
    } else { view = <CircularProgress /> }
    return (
      <>
        {view}
      </>
    );
  }
  
}

export default ViewContainerController;
