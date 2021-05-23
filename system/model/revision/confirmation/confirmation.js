import React, { Component } from 'react';

import {
  Grid,
  Button,
} from '@material-ui/core';

import mcbc from '../query/checkLib/mcbc';
import mcbuc from '../query/checkLib/mcbuc';

import Confirm from '../query/libs/Confirm';
import Unconfirm from '../query/libs/Unconfirm';

import Circular from '../../../../components/CircularProgressController/CircularProgressController';

const Container = props => <Grid container {...props} />;
const Item = props => <Grid item {...props} />;

class Confirmation extends Component {

  state = {
    checked: false,
    cid: false,
    crid: false,
    errors: false,
    confirmed: false,
    used: false,
  }

  componentDidMount = (props) => {
    const { selections } = this.props; //onResfresh, errors
    const { selectedc } = selections;
    const { sc, scr, scc, scu } = selectedc;
    this.setState({
      cid: sc,
      crid: scr,
      confirmed: scc ? true : false,
      used: scu ? true : false,
      checked: false,
    })

  }

  checker = async (sc, scr, confirmed, used) => {

    const ask = !confirmed ? await this.checkToBeConfirm(sc, scr) : await this.checkToBeUnconfirm(sc, scr);
    if (ask.status) {
      this.setState({
        cid: sc,
        crid: scr,
        confirmed: confirmed ? true : false,
        used: used ? true : false,
        checked: true,
        errors: false,
      });
    } else {
      const { data } = ask;
      const { errors } = data;
      this.setState({
        errors: errors,
        checked: true,
      });
    }
  }

  checkToBeConfirm = async (sc, scr) => {
    return await mcbc(sc, scr);
  }

  checkToBeUnconfirm = async (sc, scr) => {
    return await mcbuc(sc, scr);
  }

  onConfirm = async () => {
    const { onRefresh } = this.props;
    const { cid, crid, confirmed } = this.state;
    if (!confirmed) {
      const confirm = await Confirm(cid, crid);
      if (confirm.status) {
        this.setState({
          confirmed: true,
          checked: false,
          errors: false,
        })
      }
    } else {
      onRefresh();
    }
  }

  onUnconfirm = async () => {
    const { onRefresh } = this.props;
    const { cid, crid, confirmed } = this.state;
    if (confirmed) {
      const unconfirm = await Unconfirm(cid, crid);
      if (unconfirm.status) {
        this.setState({
          confirmed: false,
          checked: false,
          errors: false,
        })
      }
    } else {
      onRefresh();
    }
  }

  render() {
    const { cid, crid, checked, confirmed, used } = this.state;
    // const error = errors ? true : false;
    // console.log(this.state)
    if (cid && crid && !checked) { this.checker(cid, crid, confirmed, used) };
    const { selections } = this.props;
    const { selectedfg } = selections;
    const { sfgr } = selectedfg;
    const disabled = sfgr ? true : false;
    return (
      <>
        {!checked ? <Circular /> : null}
        {checked ?
          <Container spacing={1} alignItems="center" justify="center">
            <Item>
              {!confirmed ? (<Item><Button disabled={disabled} variant="contained" color="primary" onClick={this.onConfirm}>Confirm and block revision</Button></Item>) : null}
              {confirmed && !used ? (<Item><Button disabled={disabled} variant="contained" color="secondary" onClick={this.onUnconfirm}>Unconfirm and unblock revision</Button></Item>) : null}
              {confirmed && used ? (<Item><Button disabled={disabled} variant="outlined" color="secondary">Unconfirm blocked due to model usage</Button></Item>) : null}
            </Item>
          </Container>
          : null}
      </>
    );
  }
};

export default Confirmation;
