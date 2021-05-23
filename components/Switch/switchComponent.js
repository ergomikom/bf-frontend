import React, { Component } from 'react';

import {
  Grid,
  Switch,
} from '@material-ui/core';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const Container = props => <Grid container {...props} />;
const Item = props => <Grid item {...props} />;

class SwitchComponent extends Component {

  state = {
    switchState: false,
    labelFalse: "",
    labelTrue: "",
  }

  componentDidMount(props) {
    const { switchState, labelFalse, labelTrue } = this.props;
    this.setState({
      switchState: switchState,
      labelFalse: labelFalse,
      labelTrue: labelTrue,
    })
  }

  handleChange = () => {
    const { changeState } = this.props;
    this.setState(prevState => ({
      switchState: !prevState.switchState,
    }));

    changeState(!this.state.switchState);
  }

  render() {
    const { switchState, labelFalse, labelTrue } = this.state;
    const label = !switchState ? labelFalse : labelTrue;
    return (
      <Container spacing={1} alignItems="center" justify="center">
        <Item>
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value={label}
                control={<Switch
                  checked={switchState}
                  onChange={this.handleChange}
                  label={label}
                />}
                label={label}
              />
            </FormGroup>
          </FormControl>
        </Item>
      </Container>
    );
  }
}

export default SwitchComponent;