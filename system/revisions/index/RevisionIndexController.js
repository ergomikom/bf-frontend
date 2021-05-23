import React, { Component } from 'react';
// import { NavLink, Route, Switch } from 'react-router-dom';

import RevisionlIndexCard from './RevisionIndexCard';

import {
  Grid,
  CircularProgress,
} from '@material-ui/core';

const Container = props => <Grid container {...props} />;
const Item = props => <Grid item {...props} />;

class RevisionIndexController extends Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  state = {
    error: false,
    errors: [],
    fetched: false,
    data: undefined,
    type: undefined,
    from: 1,
    size: 12,
    mid: undefined,
  }

  containersIndexOptions = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    // headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  fetchRevisionIndex = (type = "c", from = 1, size = 100, mid = 0) => {

    let API = `/api/r/index/${type}/${from}/${size}/${mid}`;

    fetch(API, this.containersIndexOptions)
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
          this.setState({
            data: data,
            mid: mid,
            type: type,
            from: from,
            size: size,
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

  componentDidMount() {
    const { type, from, size, mid } = this.props;
    // setTimeout(() => this.fetchRevisionIndex(type, from, size, mid), 500);
    this.fetchRevisionIndex(type, from, size, mid);
  }

  render() {
    const { data, fetched, error } = this.state;
    const { mid, } = this.props; //name

    return (
      <Container spacing={2}>
        <Item lg={12} xl={12} md={12} sm={12} xs={12}>
          {!error && fetched ? <RevisionlIndexCard mid={mid} index={data} /> : <CircularProgress />}
        </Item>
      </Container>
    );
  }
}

export default RevisionIndexController;
