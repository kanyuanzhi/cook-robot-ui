export function secondsToMMSS(sec, ph1 = ":", ph2 = "") {
  let ss = sec % 60
  if (ss < 10) ss = "0" + ss
  let mm = (sec - ss) / 60
  if (mm < 10) mm = "0" + mm
  return mm + ph1 + ss + ph2
}
