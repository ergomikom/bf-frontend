import React, { Component } from 'react';

import {
  Grid,
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  CircularProgress
} from '@material-ui/core';

const Search = <CircularProgress size={18} />;

const Container = props => <Grid container {...props} />;
const Item = props => <Grid item {...props} />;

class ModelNew extends Component {

  state = {
    name: "",
    checked: false,
    error: false,
    errors: {},
    stateIcon: null
  }

  timeout = null;
  maxNameLength = 63;

  handleSubmit = (e) => {
    e.preventDefault();
    const { name } = this.state;
    const { selectionsChanges } = this.props;
    const { changeSC } = selectionsChanges;

    changeSC({ scname: name, sc: false, scr: false, scc: false, scu: false, scEdit: false })
  }

  handleNameChange = (e) => {
    const { selectionsChanges } = this.props;
    const { changeSC } = selectionsChanges;

    if (this.timeout) { clearTimeout(this.timeout); }
    const value = e.target.value;
    if (value.length > 0) {
      this.setState({
        name: value,
        checked: false,
        errors: false,
        stateIcon: Search,
      });
      this.timeout = setTimeout(() => this.checkExists(this.state.name), 1000);
    } else {
      this.setState({
        name: value,
        checked: false,
        errors: false,
        stateIcon: null,
        execute: false,
      });
      changeSC({ scname: false, sc: false, scr: false, scc: false, scu: false, scEdit: true, sCInThisModel: false })
    }
  }

  checkExistsOptions = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    // headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  checkExists = (name) => {
    fetch(`/api/c/exists/c/${name}`, this.checkExistsOptions)
      .then(response => response.json())
      .then(response => {
        if (response.status) {
          this.setState({
            checked: true,
            errors: false,
            stateIcon: null,
          });
        } else {
          this.setState({
            errors: response.data,
            checked: true,
            stateIcon: null,
          });
        }
      })
      .catch(e => {
        //TODO: inject component to send error data
        console.log(e)
      })
  }

  componentDidMount(props) {
    const { errors, selections } = this.props;
    const { selectedc } = selections;

    this.setState({
      errors: errors,
      name: selectedc.scname ? selectedc.scname : "",
    })
  }

  componentWillUnmount(props) {
    clearTimeout(this.timeout);
  }

  render() {
    const { name, stateIcon, errors, checked } = this.state;

    const error = errors ? true : false;

    let isError;
    if (errors.name) {
      isError = error && errors.name.msg ? errors.name.msg : null;
    } else if (errors.msg) {
      isError = error && errors.msg ? errors.msg : null;
    } else {
      isError = null;
    }

    const color = isError ? "secondary" : "primary";
    const noError = checked ? "correct name" : "";
    return (
      <form noValidate autoComplete="off" onSubmit={(e) => { e.preventDefault() }}>
        <Container spacing={2} alignItems="center" justify="center">
          <Item>
            {stateIcon}
          </Item>
          <Item>
            <FormControl variant="filled" error>
              <InputLabel error={error} htmlFor="name">enter model name</InputLabel>
              <Input variant="outlined" fullWidth error={error} id="name" value={name} onChange={this.handleNameChange} aria-describedby="nameHelp" color={color} type="search" />
              <FormHelperText error={error} id="nameHelp">{error ? isError : noError}</FormHelperText>
            </FormControl>
          </Item>
          <Item>
            {checked && !error ? <Button fullWidth variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button> : null}

          </Item>
        </Container>
      </form>
    );
  }
}

export default ModelNew;