import React, { Component } from 'react';

import {
  CircularProgress
} from '@material-ui/core';

import CountModelsBadge from './CountModelsBadge';

// props 
// type
// mid
class CountElementsController extends Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  
  state = {
    error: false,
    errors: [],
    fetched: false,
    data: {},
    count: 0,
    prevcount: 0,
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

  fetchCountModels = (type) => {
    const API = `/api/c/count/${type}`;
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
          this.setState(prevstate => ({
            data: data,
            prevcount: prevstate.count,
            count: data.COUNT,
            fetched: true,
          }));
        } else {
          this.timeout = setTimeout(() => this.setState({
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
    const { type } = this.props;
    this.fetchCountModels(type);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  componentDidUpdate(props) {
    clearTimeout(this.timeout);
    const { type } = this.props;
    this.timeout = setTimeout(() => this.fetchCountModels(type), 10000);
  }

  render() {
    const { count, fetched } = this.state;
    // const { prevcount, count, fetched, error, errors, data } = this.state;
    return (
      fetched ? <CountModelsBadge count={count} /> : <CircularProgress size={20} />
    );
  }
}

export default CountElementsController;
