import React from 'react';
import {
  Grid,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@material-ui/core';

import Fields from '../fields/controller.js';
import LinkIcon from '@material-ui/icons/Link';
import LinkOffIcon from '@material-ui/icons/LinkOff';

const Item = props => <Grid item {...props} />;

const FieldgroupExisting = props => {
  const { onReloadedFG, toReloadFG, fieldgroup, selectionsChanges, selections } = props;
  const { fgname, fg, fgr } = fieldgroup //inThisModel
  const { selectedf, selectedfg } = selections;
  const { sfg, sfgr, sFGtoUnlink } = selectedfg;
  const { sFtoUnlink } = selectedf;

  const { changeSFG } = selectionsChanges;

  const uncheckToUnlink = () => {
    changeSFG({ sfgname: fgname, sfg: fg, sfgr: fgr, sfgEdit: false, sFGInThisModel: true, sFGtoUnlink: false, });
  }

  const checkToUnlink = () => {
    changeSFG({ sfgname: fgname, sfg: fg, sfgr: fgr, sfgEdit: false, sFGInThisModel: true, sFGtoUnlink: true, });
  }

  const isFGSelected = sfg === fg && sfgr === fgr;

  const subtitle = `${fg}, ${fgr}`;

  const select = !sfg ? (
    <CardActions disableSpacing>
      <Button fullWidth variant="contained" color="primary" onClick={() => changeSFG({ sfgname: fgname, sfg: fg, sfgr: fgr, sfgEdit: false, sFGInThisModel: true, })}>Select</Button></CardActions>
  ) : (
      <CardActions disableSpacing><Button fullWidth variant="contained" color="secondary" onClick={() => changeSFG({ sfgname: false, sfg: false, sfgr: false, sfgEdit: false, sFGInThisModel: true })}>Unselect</Button></CardActions>
    );

  const setFGToUnlink = sFGtoUnlink ? true : false;
  const title = setFGToUnlink ? "TO UNLINK: " + fgname : fgname;

  return (
    <Item xs={12} sm={6} md={6} lg={4} xl={4}>
      <Card>
        <CardHeader title={title} subheader={subtitle} />
        {select}

        {!sFtoUnlink ?
          <CardActions disableSpacing>

            {isFGSelected && !setFGToUnlink ? (
              <>
                <Button startIcon={<LinkOffIcon />} size="small" fullWidth variant="outlined" color="secondary" onClick={() => checkToUnlink()}>select to unlink</Button>
              </>
            ) : null}

            {isFGSelected && setFGToUnlink ? <Button startIcon={<LinkIcon />} fullWidth size="small" variant="contained" color="primary" onClick={() => uncheckToUnlink()}>cancel the unlink</Button> : null}

          </CardActions> : null}

        <CardContent>
          <Fields selections={selections} selectionsChanges={selectionsChanges} onReloadedFG={onReloadedFG} toReloadFG={toReloadFG} isFGSelected={isFGSelected} fieldgroup={fieldgroup} />
        </CardContent>


      </Card>
    </Item>
  );
}

export default FieldgroupExisting;