import React, { Component } from 'react';

import {
  Grid,
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  CircularProgress,
} from '@material-ui/core';

const Search = <CircularProgress size={18} />;

const Container = props => <Grid container {...props} />;
const Item = props => <Grid item {...props} />;

class FieldgroupNew extends Component {

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
    const { changeSFG } = selectionsChanges;
    changeSFG({ sfgname: name, sfg: false, sfgr: false, sfgEdit: false, sFGInThisModel: false })
  }

  handleNameChange = (e) => {
    if (this.timeout) { clearTimeout(this.timeout); }
    const value = e.target.value;
    if (value.length > 0) {
      this.setState({
        name: value,
        checked: false,
        error: false,
        errors: false,
        stateIcon: Search,
      });
      this.timeout = setTimeout(() => this.checkExists(this.state.name), 1000);
    } else {
      this.setState({
        name: value,
        checked: false,
        error: false,
        errors: false,
        stateIcon: null,
      });
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
    fetch(`/api/c/exists/fg/${name}`, this.checkExistsOptions)
      .then(response => response.json())
      .then(response => {
        if (response.status) {
          this.setState({
            error: false,
            checked: true,
            errors: false,
            stateIcon: null,
          });
        } else {
          this.setState({
            error: true,
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
    const { selections } = this.props;
    const { selectedfg } = selections;
    const { sfgname } = selectedfg;
    this.setState({
      name: sfgname ? sfgname : "",
    });
  }

  componentWillUnmount(props) {
    clearTimeout(this.timeout);
  }

  render() {
    const { name, stateIcon, error, errors, checked } = this.state;
    let isError;
    if (errors.name) {
      isError = error && errors.name.msg ? errors.name.msg : null;
    } else if (errors.msg) {
      isError = error && errors.msg ? errors.msg : null;
    } else {
      isError = null;
    }
    const noError = checked ? "may be create" : "new field name";

    return (
      <form noValidate autoComplete="off" onSubmit={(e) => { e.preventDefault() }}>
        <Container spacing={1} alignItems="center" justify="center">
          <Item>
            {stateIcon}
          </Item>
          <Item>
            <FormControl variant="filled">
              <InputLabel error={error} htmlFor="name">enter name</InputLabel>
              <Input autoFocus fullWidth error={error} id="name" value={name} onChange={this.handleNameChange} aria-describedby="nameHelp" variant="filled" type="search" />
              <FormHelperText error={error} id="nameHelp">{error ? isError : noError}</FormHelperText>
            </FormControl>
          </Item>
          <Item>
            {!error && name && checked ? <Button fullWidth variant="contained" color="primary" onClick={this.handleSubmit}>
              Submit
                  </Button> : null}
          </Item>
        </Container>
      </form >
    );
  }
}

export default FieldgroupNew;