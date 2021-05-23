import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import ModelController from './model/controller';
import FieldgroupController from './fieldgroup/controller';
import FieldgroupsController from './fieldgroups/controller';
import FieldController from './field/controller';
import Confirmation from './confirmation/confirmation';

import Circular from '../../../components/CircularProgressController/CircularProgressController';

import SMD from './libs/saveModeDeterminator';
import QE from './query/executor';


import {
  Grid,
  Button,
} from '@material-ui/core';

const Container = props => <Grid container {...props} />;
const Item = props => <Grid item {...props} />;

const defaultSelectedC = { scname: false, sc: false, scr: false, scc: false, scu: false, scEdit: false, sCInThisModel: false };
const defaultSelectedFG = { sfgname: false, sfg: false, sfgr: false, sfgEdit: false, sFGInThisModel: false }
const defaultSelectedF = { sfname: false, sf: false, sfr: false, sdt: false, sdtname: false, sfEdit: false, sFInThisModel: false };

class Revision extends Component {

  state = {
    mid: false,
    mrid: false,
    selectedc: defaultSelectedC,
    selectedfg: defaultSelectedFG,
    selectedf: defaultSelectedF,
    toReloadFG: false,
    executed: false,
    errors: false,
    redirect: false,
    redirectTo: false,
    fetched: false,
    canBeExec: false,
  }

  fetchOptions = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    // headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  fetchContainer = (mid, mrid) => {
    fetch(`/api/r/c/${mid}/${mrid}`, this.fetchOptions)
      .then(response => response.json())
      .then(response => {
        if (response.status) {
          const { cname, c, cr, cc, cu } = response.data;
          this.setState({
            mid: c,
            mrid: cr,
            errors: false,
            fetched: true,
            selectedc: { scname: cname, sc: c, scr: cr, scc: cc, scu: cu, scEdit: false },
          });
        } else {
          this.setState({
            redirect: true,
            redirectTo: `/model/${mid}`,
            errors: response.data,
            fetched: true,
          });
        }
      })
      .catch(e => {
        //TODO: inject component to send error data
        console.log(e)
      })
  }

  changeSC = (data) => {
    this.setState({
      selectedc: data,
      selectedfg: defaultSelectedFG,
      selectedf: defaultSelectedF,
      executed: false,
      canBeExec: false,
    })
    const saveMode = SMD(this.state, data, defaultSelectedFG, defaultSelectedF);
    this.onCanBeExec(saveMode, data, defaultSelectedFG, defaultSelectedF);
  }

  changeSFG = (data) => {
    this.setState({
      selectedfg: data,
      selectedf: defaultSelectedF,
      executed: false,
      canBeExec: false,
    })
    const { selectedc } = this.state;
    const saveMode = SMD(this.state, selectedc, data, defaultSelectedF);
    this.onCanBeExec(saveMode, selectedc, data, defaultSelectedF);
  }

  changeSF = (data) => {
    this.setState({
      selectedf: data,
      executed: false,
      canBeExec: false,
    });
    const { selectedc, selectedfg } = this.state;
    const saveMode = SMD(this.state, selectedc, selectedfg, data);
    this.onCanBeExec(saveMode, selectedc, selectedfg, data);
  }

  onResfresh = () => {
    const { mid, mrid } = this.state;
    if (mid && mrid) {
      this.fetchContainer(mid, mrid);
    }
  }

  onExecute = async (saveMode, selections) => {
    const { selectedc, selectedfg, selectedf } = selections;
    const QEResult = await QE(saveMode, selectedc, selectedfg, selectedf);
    if (QEResult) {
      if (QEResult.status) {
        const { data } = QEResult;
        if (data.result || (data.c && data.cr)) {
          const { c, cr } = data;
          const { mid, mrid } = this.state;
          const { sfg, sfgr } = selectedfg;
          const isRedirect = !(mid === c && mrid === cr) ? true : false;
          const rc = isRedirect ? c : mid;
          const rcr = isRedirect ? cr : mrid;
          console.log("isRedirect: " + isRedirect)
          console.log("rc: " + rc)
          console.log("rcr: " + rcr)
          this.setState({
            redirect: isRedirect,
            redirectTo: `/model/${rc}/rev/${rcr}`,
            mid: rc,
            mrid: rcr,
            selectedc: defaultSelectedC,
            selectedfg: defaultSelectedFG,
            selectedf: defaultSelectedF,
            executed: true,
            fetched: false,
            toReloadFG: { sfg, sfgr },
          });
        } else {
          this.setState({
            redirect: true,
            redirectTo: `/models`,
            mid: 0,
            mrid: 0,
            selectedc: defaultSelectedC,
            selectedfg: defaultSelectedFG,
            selectedf: defaultSelectedF,
            executed: true,
            fetched: false,
          });
        }


      } else {
        const { data } = QEResult;
        console.log(data)
        this.setState({
          errors: data,
          executed: false,
        });
      }
    } else {
      console.log(" error onExecute")
    }
  }

  onCanBeExec = async (saveMode, selectedc, selectedfg, selectedf) => {
    const { canBeExec } = this.state;
    const QEResult = await QE(saveMode, selectedc, selectedfg, selectedf, true);
    if (QEResult) {
      if (QEResult.status) {
        if (QEResult.data.result && !canBeExec) {
          this.setState({
            canBeExec: true,
          });
        }
      } else if (!QEResult.status) {
        console.log(QEResult.data)
        this.setState({
          errors: QEResult.data,
          canBeExec: false,
        })
      }
    }
  }

  componentDidMount(props) {
    const { mid, mrid } = this.props;
    if (mid && mrid) {
      this.setState({
        mid: Number.parseInt(mid),
        mrid: Number.parseInt(mrid),
      })
      this.fetchContainer(mid, mrid);
    }
  }

  onReloadedFG = () => {
    this.setState({
      toReloadFG: false,
    })
  }
  render() {
    const { mid, mrid, redirect, redirectTo, selectedc, selectedfg, selectedf, executed, errors, fetched, toReloadFG, canBeExec } = this.state;
    const { scname, scc, scEdit } = selectedc; //sCInThisModel
    const { sfgname, sfg, sFGInThisModel, sFGtoUnlink } = selectedfg;
    const { sFtoUnlink } = selectedf; //sFInThisModel


    if (redirect && redirectTo) {
      this.setState({ redirect: false, fetched: false, });
      const redirect_url = redirectTo;
      return (
        <Redirect push to={redirect_url} />
      );
    } else if (mid && mrid && !fetched) {
      this.fetchContainer(mid, mrid);
      return (
        <Circular />
      )
    } else {
      console.log(this.state)
      const error = errors ? true : false;
      if (error) console.log(errors)
      const { changeSC, changeSFG, changeSF } = this;
      const selections = { selectedc, selectedfg, selectedf };
      const selectionsChanges = { changeSC, changeSFG, changeSF };
      const saveMode = SMD(this.state, selectedc, selectedfg, selectedf);

      const disabledExecute = !canBeExec || executed ? true : false; // !checked || 
      const executionInfo = scc ? "Execute and create new revision " : "Execute";
      return (
        <>
          <Container spacing={1} alignItems="flex-start" justify="center">
            <ModelController selections={selections} selectionsChanges={selectionsChanges} changeSelected={this.changeSelectedContainer} onResfresh={this.onResfresh} errors={errors} />

            {fetched && (!sfgname || sfg) ?
              (<>
                <Confirmation selections={selections} onResfresh={this.onResfresh} errors={errors} />
                <FieldgroupsController selections={selections} selectionsChanges={selectionsChanges} onReloadedFG={this.onReloadedFG} toReloadFG={toReloadFG} errors={errors} />
              </>)
              : null}

            {!scEdit && scname && ((!sfgname || !sfg) || (sfg && !sFGInThisModel)) ? (<FieldgroupController selections={selections} selectionsChanges={selectionsChanges} errors={errors} />) : null}
          </Container >

          {sfgname && !sFGtoUnlink && !sFtoUnlink ? (
            <Container spacing={1} alignItems="flex-start" justify="center">
              <FieldController selections={selections} selectionsChanges={selectionsChanges} errors={errors} />
            </Container >
          ) : null}

          {!disabledExecute ? (
            <Container spacing={1} alignItems="flex-start" justify="center">
              <Item xs={11} sm={11} md={11} lg={11} xl={11}>
                <Button fullWidth disabled={disabledExecute} variant="contained" color="primary" onClick={() => this.onExecute(saveMode, selections)}>{executionInfo}</Button>
              </Item>
            </Container>) : null}

        </>
      );
    }


  }
}

export default Revision;