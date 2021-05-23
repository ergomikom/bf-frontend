import nnnDT from './libs/nnnDT';
import nnF from './libs/nnF';
import nFG from './libs/nFG';
import CnnDT from './libs/CnnDT';
import CnF from './libs/CnF';
import CFGnDT from './libs/CFGnDT';
import lCFG from './libs/lCFG';
import lFGF from './libs/lFGF';
import ulCFG from './libs/ulCFG';
import ulFGF from './libs/ulFGF';

import fcbl from './checkLib/fcbl';
import fcbul from './checkLib/fcbul';
import fgcbl from './checkLib/fgcbl';
import fgcbul from './checkLib/fgcbul';


const executor = async (saveMode, sC, sFG, sF, mode = false) => {
  const canBeExecuteTrue = { status: 1, data: { result: true } };
  console.log("Save mode: " + saveMode)
  switch (saveMode) {
    case 1:
      //scname, sfgname, sfname, sdt
      console.log("nnnDT")
      // console.log(sC.scname, sFG.sfgname, sF.sfname, sF.sdt)
      if (mode) return canBeExecuteTrue;
      return await nnnDT(sC.scname, sFG.sfgname, sF.sfname, sF.sdt);
    case 2:
      //scname, sfgname, f, fr
      console.log("nnF")
      // console.log(sC.scname, sFG.sfgname, sF.sf, sF.sfr)
      if (mode) return canBeExecuteTrue;
      return await nnF(sC.scname, sFG.sfgname, sF.sf, sF.sfr);
    case 3:
      // scname, fg, fgr
      console.log("nFG")
      // console.log(sC.scname, sFG.sfg, sFG.sfgr)
      if (mode) return canBeExecuteTrue;
      return await nFG(sC.scname, sFG.sfg, sFG.sfgr);
    case 4:
      // c, cr, sfgname, sfname, sdt
      console.log("CnnDT")
      // console.log(sC.sc, sC.scr, sFG.sfgname, sF.sfname, sF.sdt)
      if (mode) return canBeExecuteTrue;
      return await CnnDT(sC.sc, sC.scr, sFG.sfgname, sF.sfname, sF.sdt);
    case 5:
      // c, cr, sfgname, f, fr
      console.log("CnF")
      // console.log(sC.sc, sC.scr, sFG.sfgname, sF.sf, sF.sfr)
      if (mode) return canBeExecuteTrue;
      return await CnF(sC.sc, sC.scr, sFG.sfgname, sF.sf, sF.sfr);
    case 6:
      // fg, fgr, sfname, sdt
      console.log("CFGnDT")
      // console.log(sFG.sfg, sFG.sfgr, sF.sfname, sF.sdt)
      if (mode) return canBeExecuteTrue;
      return await CFGnDT(sFG.sfg, sFG.sfgr, sF.sfname, sF.sdt);
    case 7: // link C to FG
      // c, cr, fg, fgr
      console.log("lCFG")
      const fgcbl_result = await fgcbl(sC.sc, sC.scr, sFG.sfg, sFG.sfgr);
      if (fgcbl_result && fgcbl_result.status) {
        if (mode) return fgcbl_result;
        return await lCFG(sC.sc, sC.scr, sFG.sfg, sFG.sfgr);
      } else {
        return fgcbl_result;
      }

    case 8: // link FG to F
      // fg, fgr, f, fr
      console.log("lFGF")
      const fcbl_result = await fcbl(sFG.sfg, sFG.sfgr, sF.sf, sF.sfr);
      if (fcbl_result && fcbl_result.status) {
        if (mode) return fcbl_result;
        return await lFGF(sFG.sfg, sFG.sfgr, sF.sf, sF.sfr);
      } else {
        return fcbl_result;
      }
    case 9: // unlink C to FG
      // c, cr, fg, fgr
      console.log("ulCFG")
      const fgcbul_result = await fgcbul(sC.sc, sC.scr, sFG.sfg, sFG.sfgr);
      if (fgcbul_result && fgcbul_result.status) {
        if (mode) return fgcbul_result;
        return await ulCFG(sC.sc, sC.scr, sFG.sfg, sFG.sfgr);
      } else {
        return fgcbul_result;
      }
    case 10: // unlink FG to F
      // fg, fgr, f, fr
      console.log("ulFGF")
      const fcbul_result = await fcbul(sFG.sfg, sFG.sfgr, sF.sf, sF.sfr);
      if (fcbul_result && fcbul_result.status) {
        if (mode) return fcbul_result;
        return await ulFGF(sFG.sfg, sFG.sfgr, sF.sf, sF.sfr);
      } else {
        return fcbul_result;
      }
    default:
      return false;
  }
}

export default executor;