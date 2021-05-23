import React, { Component } from 'react';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

import Circular from '../../../../../../components/CircularProgressController/CircularProgressController';

import {
  Grid,
} from '@material-ui/core';

import FieldgroupRevision from './fieldgroupRevision';

const Container = props => <Grid container {...props} />;
// const Item = props => <Grid item {...props} />;

// import fcbl from '../../query/checkLib/fcbl';

class Stage1 extends Component {

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

  fetchData = (fgid, from, size, contain) => {
    let API = `/api/r/fieldgroups/${fgid}/${from}/${size}`;
    API = contain ? API + `/${contain}` : API;
    fetch(API, this.fetchDataOptions)
      .then(response => response.json())
      .then(response => {
        if (response.status) {
          this.setState({
            errors: false,
            data: response.data,
            fetched: true,
          });
        } else {
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
    const { selected } = this.props;
    const { sfg } = selected;
    this.fetchData(sfg, 1, 10);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onSelectFieldgroup = (selectedFieldgroup) => {
    const { onChangeState } = this.props;
    onChangeState(selectedFieldgroup);
  }

  render() {
    const { selected } = this.props;
    const { sfgname } = selected;

    const { data, fetched } = this.state;
    const rendered = data ? data.map(item => {
      const { fgr } = item;
      return <FieldgroupRevision key={fgr} revision={item} selected={selected} onSelectFieldgroup={this.onSelectFieldgroup} />
    }) : null;

    return (
      <>
        <DialogActions>
          Stage 2 - Select [{sfgname}] fieldgroup revision
        </DialogActions>
        <DialogContent>
          <DialogContentText>
            {fetched ? (<Container spacing={1} alignItems="flex-start" justify="flex-start">{rendered}</Container>) : <Circular />}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onSelectFieldgroup}>Back to select fieldgroup</Button>
        </DialogActions>
      </>
    );
  }
}

export default Stage1;

