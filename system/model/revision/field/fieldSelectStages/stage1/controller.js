import React, { Component } from 'react';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

// import CloseIcon from '@material-ui/icons/Close';
import Circular from '../../../../../../components/CircularProgressController/CircularProgressController';

import {
  Grid,
} from '@material-ui/core';

// import ModelNameSearchForm from './modelNameSearchForm';
import FieldRevision from './fieldRevision';


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

  fetchData = (fid, from, size, contain) => {
    let API = `/api/r/fields/${fid}/${from}/${size}`;
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
    const { sf } = selected;
    this.fetchData(sf, 1, 10);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onSelectField = (selectedField) => {
    const { onChangeState } = this.props;
    onChangeState(selectedField);
  }

  render() {
    const { selected } = this.props;
    // const { sfname, sf } = selected;

    const { data, fetched } = this.state;
    const renderedFieldRevisions = data ? data.map(fieldRevision => {
      const { fr } = fieldRevision;
      return <FieldRevision key={fr} revision={fieldRevision} selected={selected} onSelectField={this.onSelectField} />
    }) : null;

    return (
      <>
        <DialogActions>
          Stage 2 - Select field revision
        </DialogActions>
        <DialogContent>
          <DialogContentText>
            {/* <Container spacing={1} alignItems="center" justify="center">
              <Item>
                <ModelNameSearchForm />
              </Item>
            </Container> */}
            {fetched ? (<Container spacing={1} alignItems="flex-start" justify="flex-start">{renderedFieldRevisions}</Container>) : <Circular />}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onSelectField}>Back to select field</Button>
        </DialogActions>
      </>
    );
  }
}

export default Stage1;

