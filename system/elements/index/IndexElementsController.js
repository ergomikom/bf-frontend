import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
// import { NavLink, Route, Switch } from 'react-router-dom';

import ViewElement from '../container/view/IndexCardView';
import SearchForm from './components/IndexElement_SearchForm';
import CountElements from '../../elements/count/CountElementsController';
import ViewError from '../../../components/Error/ViewError';
import CreateContainerDialog from '../../elements/container/create/CreateContainerDialog';

import {
  Grid,
  CircularProgress,
  Typography,
} from '@material-ui/core';

import ErrorIcon from '@material-ui/icons/Error';
import SearchIcon from '@material-ui/icons/Search';

const Container = props => <Grid container {...props} />;
const Item = props => <Grid item {...props} />;
const H4 = props => <Typography color="primary" variant="h4" {...props} />;
const Wait = props => (<CircularProgress size={20} />);

class IndexElementsController extends Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  state = {
    redirect: false,
    redirectTo: false,
    error: false,
    errors: [],
    fetched: false,
    data: [],
    contain: "",
    from: undefined,
    size: undefined,
    type: undefined,
    stateIcon: <SearchIcon color="primary" />
  }

  timeout = null;

  containersIndexOptions = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    // headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  fetchContainersIndex = (type, from, size, contain) => {
    let API = `/api/c/index/${type}/${from}/${size}`;
    API = contain ? API + `/${contain}` : API;
    fetch(API, this.containersIndexOptions)
      .then(response => response.json())
      .then(response => {
        if (response.errors !== undefined) {
          const errors = response.errors;
          this.setState({
            error: true,
            errors: errors,
            stateIcon: <ErrorIcon color="secondary" />
          })
        } else if (response.data !== undefined) {
          const data = response.data;
          this.setState({
            data: data,
            fetched: true,
            type: type,
            from: from,
            size: size,
            contain: contain,
          })
        } else {
          setTimeout(() => this.setState({
            redirect: true,
            redirectTo: `/model/create`,
            error: true,
            errors: { fetch: { msg: "Fetching data error..." } },
            stateIcon: <ErrorIcon color="secondary" />,
          }), 1000);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentDidMount() {
    const { type, from, size } = this.props;
    const contain = this.props.contain === undefined ? "" : this.props.contain;
    // this.timeout = setTimeout(() => this.fetchContainersIndex(type, from, size, contain), 0);
    this.fetchContainersIndex(type, from, size, contain);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onRefresh = () => {
    const { type, from, size, contain } = this.state;
    this.fetchContainersIndex(type, from, size, contain);
  }

  handleContainChange = (e) => {
    e.preventDefault();
    if (this.timeout) { clearTimeout(this.timeout); }
    const value = e.target.value;

    if (value.length >= 0) {
      this.timeout = setTimeout(() => {
        this.setState({
          fetched: false,
          data: [],
          contain: value,
          error: false,
          errors: [],
        });
        const { type, from, size } = this.state;
        this.timeout = setTimeout(() => this.fetchContainersIndex(type, from, size, value), 500);
      }, 1000);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    const { stateIcon, data, error, errors, fetched, redirect, redirectTo } = this.state;
    const items = data.map(item => {
      const { mid, name } = item;
      return (
        <Item key={mid} xl={2} lg={3} md={4} sm={6} xs={12}>
          <ViewElement mid={mid} name={name} />
        </Item>
      )
    });

    if (redirect && redirectTo) {
      this.setState({ redirect: false, fetched: false, });
      const redirect_url = redirectTo;
      return (
        <Redirect push to={redirect_url} />
      );
    }

    return (
      <Container spacing={2}>
        <Item lg={12} xl={12} md={12} sm={12} xs={12}>
          <H4>Models<CountElements update={this.fetchContainersIndex} type="c" /></H4>
          <SearchForm icon={stateIcon} error={error} change={this.handleContainChange} />
          {!fetched && !error ? <Wait /> : null}
          <CreateContainerDialog onRefresh={this.onRefresh} />
        </Item>
        {!error ? items : <ViewError errors={errors} />}

      </Container>
    );
  }
}

export default IndexElementsController;
