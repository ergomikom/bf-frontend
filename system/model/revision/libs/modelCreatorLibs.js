
const cmode = (sC) => {
  const { scname, sc, scr } = sC;
  return scname ? (sc && scr ? { select: true, new: false } : { new: true, select: false }) : { select: false, new: false };
}

const fgmode = (sFG) => {
  const { sfgname, sfg, sfgr } = sFG;
  return sfgname ? sfg && sfgr ? { select: true, new: false } : { new: true, select: false } : { select: false, new: false };
}

const fmode = (sF) => {
  const { sfname, sf, sfr, sdt } = sF;
  return sfname ? sf && sfr && sdt ? { select: true, new: false } : { new: true, select: false } : { select: false, new: false };
}

const cIsSet = (sC) => {
  // console.log("cIsSet");
  const { scname, sc, scr } = sC;
  return (scname || (sc && scr)) ? true : false;
}

const fgIsSet = (sFG) => {
  // console.log("fgIsSet");
  const { sfgname, sfg, sfgr } = sFG;
  return (sfgname || (sfg && sfgr)) ? true : false;
}

const fIsSet = (sF) => {
  // console.log("fIsSet");
  const { sfname, sf, sfr } = sF;
  return (sfname || (sf && sfr)) ? true : false;
}

module.exports = {
  cmode,
  cIsSet,
  fgmode,
  fmode,
  fgIsSet,
  fIsSet,
};