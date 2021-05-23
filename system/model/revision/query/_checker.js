import fcbl from './checkLib/fcbl';
import fcbul from './checkLib/fcbul';
import fgcbl from './checkLib/fgcbl';
import fgcbul from './checkLib/fgcbul';

const checker = async (saveMode, sC, sFG, sF) => {
  // const { sC, sFG, sF } = this.state;
  switch (saveMode) {
    case 7: // link C to FG
      // c, cr, fg, fgr
      console.log("check lCFG")
      console.log(sC.sc, sC.scr, sFG.sfg, sFG.sfgr)
      return await fgcbl(sC.sc, sC.scr, sFG.sfg, sFG.sfgr);
    case 8: // link FG to F
      // fg, fgr, f, fr
      console.log("check lFGF")
      console.log(sFG.sfg, sFG.sfgr, sF.sf, sF.sfr)
      return await fcbl(sFG.sfg, sFG.sfgr, sF.sf, sF.sfr);
    case 9: // unlink C to FG
      // c, cr, fg, fgr
      console.log("check ulCFG")
      console.log(sC.sc, sC.scr, sFG.sfg, sFG.sfgr)
      return await fgcbul(sC.sc, sC.scr, sFG.sfg, sFG.sfgr);
    case 10: // unlink FG to F
      // fg, fgr, f, fr
      console.log("check ulFGF")
      console.log(sFG.sfg, sFG.sfgr, sF.sf, sF.sfr)
      return await fcbul(sFG.sfg, sFG.sfgr, sF.sf, sF.sfr);
    default:
      return false;
  }
}

export default checker;