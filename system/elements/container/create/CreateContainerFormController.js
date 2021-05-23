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

import AddBoxIcon from '@material-ui/icons/AddBox';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ErrorIcon from '@material-ui/icons/Error';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

const Search = <CircularProgress size={24} />;

const Container = props => <Grid container {...props} />;
const Item = props => <Grid item {...props} />;

class CreateContainerFormController extends Component {

  state = {
    name: "",
    checked: false,
    error: false,
    errors: [],
    created: false,
    createdName: "",
    createdMid: null,
    stateIcon: <AccountTreeIcon />
  }

  timeout = null;
  maxNameLength = 63;

  handleSubmit = (e) => {
    if (this.state.checked && !this.state.error) {
      this.postForm(this.state.name);
    }
    e.preventDefault();
  }

  handleNameChange = (e) => {
    if (this.timeout) { clearTimeout(this.timeout); }
    const value = e.target.value;
    if (value.length > 0) {
      this.setState({
        name: value,
        checked: false,
        error: false,
        errors: [],
        created: false,
        createdName: "",
        createdMid: null,
        stateIcon: Search,
      });
      this.timeout = setTimeout(() => this.checkContainerExists(this.state.name), 1000);
    } else {
      this.setState({
        name: value,
        checked: false,
        error: false,
        errors: [],
        created: false,
        createdName: "",
        createdMid: null,
        stateIcon: <AccountTreeIcon />,
      });
    }
  }

  postForm = (name) => {
    const API = `/api/c/create/c`;
    fetch(API, {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'// 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ name: name }) // body data type must match "Content-Type" header
    })
      .then(response => response.json())
      .then(response => {
        if (response.errors !== undefined) {
          const errors = response.errors;
          this.setState({
            error: true,
            errors: errors,
            checked: true,
            stateIcon: <ErrorOutlineIcon />,
          })
        } else {
          const data = response.data;
          this.setState({
            name: "",
            error: false,
            errors: [],
            created: true,
            checked: false,
            createdName: name,
            createdMid: data.mid,
            stateIcon: <DoneAllIcon />
          })
          this.props.onRefresh();
        }
      })
      .catch(err => {
        //TODO: inject component to send error data
        console.log(err);
      })
  }

  checkContainerExistsOptions = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    // headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  checkContainerExists = (name) => {
    fetch(`/api/c/exists/c/${name}`, this.checkContainerExistsOptions)
      .then(response => response.json())
      .then(response => {
        if (response.errors !== undefined) {
          const errors = response.errors;
          this.setState({
            error: true,
            errors: errors,
            checked: true,
            stateIcon: <ErrorIcon />
          })
        } else {
          this.setState({
            error: false,
            checked: true,
            errors: [],
            stateIcon: <DoneIcon />
          })
        }
      })
      .catch(e => {
        //TODO: inject component to send error data
        console.log(e)
      })
  }

  render() {

    const { name, stateIcon, error, errors, checked, created, createdName, createdMid } = this.state;
    const errorMsg = error ? errors.name.msg : null;
    const noErrorMsg = checked ? "You may create container with this name." : "Enter name of created container.";
    const createMsg = created ? `You create new container: [${createdMid}] ${createdName}` : null;
    return (
      <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
        <div>
          <Container spacing={2} alignItems="center" justify="center">
            <Item>
              {stateIcon}
            </Item>
            <Item>
              <FormControl>
                <InputLabel error={error} htmlFor="name">Enter name here</InputLabel>
                <Input autoFocus fullWidth error={error} id="name" value={name} onChange={this.handleNameChange} aria-describedby="nameHelp" variant="filled" type="search" />
                <FormHelperText error={error} id="nameHelp">{!error ? noErrorMsg : errorMsg}</FormHelperText>
                {createMsg ? <FormHelperText id="nameHelp">{createMsg}</FormHelperText> : null}
              </FormControl>
            </Item>
            <Item>
              <Button disabled={!checked || (checked && error)} variant="contained" color="primary" endIcon={<AddBoxIcon />} onClick={this.handleSubmit}>
                Create container
                </Button>
            </Item>
          </Container>
        </div>
      </form>
    );
  }
}

export default CreateContainerFormController;