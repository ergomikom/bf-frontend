import React, { Component } from 'react';

import SelectDTDialog from './selectDTDialog';

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

class FieldNew extends Component {

  state = {
    name: "",
    dtname: "",
    dt: false,
    openDTDialog: false,
    checked: false,
    error: false,
    errors: {},
    stateIcon: null
  }

  timeout = null;
  maxNameLength = 63;

  handleOpenDTDialog = () => {
    this.setState({
      openDTDialog: true,
    })
  }

  handleCloseDTDialog = (dtname, dtid) => {
    this.setState({
      openDTDialog: false,
      dtname: dtname,
      dt: dtid,
    });
    const { name } = this.state;
    const { selectionsChanges } = this.props;
    const { changeSF } = selectionsChanges;
    changeSF({ sfname: name, sf: false, sfr: false, sdt: dtid, sdtname: dtname, sfEdit: false, sFInThisModel: false })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, dt, dtname } = this.state;
    const { selectionsChanges } = this.props;
    const { changeSF } = selectionsChanges;
    changeSF({ sfname: name, sf: false, sfr: false, sdt: dt, sdtname: dtname, sfEdit: false, sFInThisModel: false })
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
        dt: false,
        dtname: false,
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
    fetch(`/api/c/exists/f/${name}`, this.checkExistsOptions)
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
    const { selectedf } = selections;
    const { sfname, sdt, sdtname } = selectedf;
    this.setState({
      name: sfname ? sfname : "",
      dt: sdt ? sdt : false,
      dtname: sdtname ? sdtname : "",
    });
  }

  componentWillUnmount(props) {
    clearTimeout(this.timeout);
  }

  render() {
    const { name, stateIcon, error, errors, checked, openDTDialog, dtname } = this.state;
    let isError;
    if (errors.name) {
      isError = error && errors.name.msg ? errors.name.msg : null;
    } else if (errors.msg) {
      isError = error && errors.msg ? errors.msg : null;
    } else {
      isError = null;
    }
    const noError = checked ? "may be create" : "new field name";

    const DTDialogButtonDisabled = !checked || (checked && error) ? true : false;
    const dtButtonName = dtname ? dtname : "Select datatype";

    return (
      <form noValidate autoComplete="off" onSubmit={(e) => { e.preventDefault() }}>
        <Container spacing={1} alignItems="center" justify="center">

          <Item xs={1} sm={1} md={1} lg={1} xl={1}>
            {stateIcon}
          </Item>

          <Item xs={11} sm={11} md={11} lg={11} xl={11}>
            <FormControl variant="filled">
              <InputLabel error={error} htmlFor="name">enter name</InputLabel>
              <Input autoFocus fullWidth error={error} id="name" value={name} onChange={this.handleNameChange} aria-describedby="nameHelp" variant="filled" type="search" />
              <FormHelperText error={error} id="nameHelp">{error ? isError : noError}</FormHelperText>
            </FormControl>
          </Item>

          <Item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Button size="small" disabled={DTDialogButtonDisabled} fullWidth variant="contained" color="primary" onClick={this.handleOpenDTDialog}>
              {dtButtonName}
            </Button>
            <SelectDTDialog open={openDTDialog} onClose={this.handleCloseDTDialog} />
          </Item>

          {/* <Item xs={12} sm={12} md={12} lg={12} xl={12}>
            {!error && name && checked && dt && !openDTDialog ? <Button fullWidth variant="contained" color="secondary" onClick={this.handleSubmit}>
              Save
                  </Button> : null}
          </Item> */}

        </Container>
      </form >
    );
  }
}

export default FieldNew;