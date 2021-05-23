import mcLib from './modelCreatorLibs';

const saveModeDeterminator = (states, selectedc, selectedfg, selectedf) => {

  const { sFGInThisModel, sFGtoUnlink } = selectedfg;
  const { sFInThisModel, sFtoUnlink } = selectedf;

  const cIsSet = mcLib.cIsSet(selectedc);
  const fgIsSet = mcLib.fgIsSet(selectedfg);
  const fIsSet = mcLib.fIsSet(selectedf);
  const cmode = mcLib.cmode(selectedc);
  const fgmode = mcLib.fgmode(selectedfg);
  const fmode = mcLib.fmode(selectedf);

  let saveMode = 0;
  if (cIsSet) {
    if (fgIsSet) {
      if (fIsSet) {
        if (cmode.new && fgmode.new && fmode.new) {
          saveMode = 1;
          console.log("Create nnnDT");
        } else if (cmode.new && fgmode.new && fmode.select) {
          saveMode = 2;
          console.log("Create nnF");
        } else if (cmode.select && fgmode.new && fmode.new) {
          saveMode = 4;
          console.log("Create CnnDT");
        } else if (cmode.select && fgmode.new && fmode.select) {
          saveMode = 5;
          console.log("Create CnF");
        } else if (cmode.select && fgmode.select && fmode.new) {
          saveMode = 6;
          console.log("Create CFGnDT");
        } else if (fgmode.select && fmode.select && !sFInThisModel) {
          saveMode = 8;
          console.log("Link FGF");
        } else if (cmode.select && fgmode.select && sFtoUnlink) {
          saveMode = 10;
          console.log("Unink FGF");
        }
      } else {
        if (cmode.new && fgmode.select) {
          saveMode = 3;
          console.log("nFG");
        } else if (cmode.select && fgmode.select && !sFGInThisModel) {
          saveMode = 7;
          console.log("Link CFG");
        } else if (cmode.select && fgmode.select && sFGtoUnlink) {
          saveMode = 9;
          console.log("Unlink CFG");
        }
      }
    }
  }

  console.log("SaveMode = " + saveMode);
  return saveMode;
}

export default saveModeDeterminator;