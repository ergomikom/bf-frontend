import React, { Component } from 'react';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Button from '@material-ui/core/Button';
// import CloseIcon from '@material-ui/icons/Close';

import {
  Grid,
} from '@material-ui/core';

import Circular from '../../../../../../components/CircularProgressController/CircularProgressController';
// import FieldNameSearchForm from './fieldNameSearchForm';
import Fieldgroup from './fieldgroup';

const Container = props => <Grid container {...props} />;
// const Item = props => <Grid item {...props} />;

// import fcbl from '../../query/checkLib/fcbl';

class Stage0 extends Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  state = {
    errors: false,
    data: false,
    fetched: false,
    contain: false,
  }

  timeout = null;

  fetchDataOptions = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    // headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  fetchData = (from, size, contain) => {
    let API = `/api/c/fieldgroups/${from}/${size}`;
    API = contain ? API + `/${contain}` : API;
    fetch(API, this.fetchDataOptions)
      .then(response => response.json())
      .then(response => {
        if (response.status) {
          // console.log(response.data)
          this.setState({
            errors: false,
            data: response.data,
            fetched: true,
          });
        } else {
          // console.log(response.data)
          this.setState({
            errors: response.data,
            data: false,
            fetched: true,
          });
        }
      })
      .catch(e => {
        //TODO: inject component to send error data
        console.log(e)
      })
  }

  componentDidMount() {
    this.fetchData(1, 10);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onSelectFieldgroup = (selectedFieldgroup) => {
    const { onChangeState } = this.props;
    onChangeState(selectedFieldgroup);
  }

  render() {
    const { data, fetched } = this.state;
    // const { onCloseDialog } = this.props;
    const renderedFieldgroups = data ? data.map(fieldgroup => {
      const { fg } = fieldgroup;
      return <Fieldgroup key={fg} fieldgroup={fieldgroup} onSelectFieldgroup={this.onSelectFieldgroup} />
    }) : null;

    return (
      <>
        <DialogActions>
          Stage 1 - Select fieldgroup
        </DialogActions>
        <DialogContent>
          <DialogContentText>
            {fetched ? (<Container spacing={1} alignItems="flex-start" justify="flex-start">{renderedFieldgroups}</Container>) : <Circular />}
          </DialogContentText>
        </DialogContent>
      </>
    );
  }
}

export default Stage0;

