const ulFGF = async (fg, fgr, f, fr) => {
  console.log(fg, fgr, f, fr)
  const API = `/api/m/funlink/`;
  const result = await fetch(API, {
    method: 'POST',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'// 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(
      {
        fg: fg,
        fgr: fgr,
        f: f,
        fr: fr,
      }
    ) // body data type must match "Content-Type" header
  })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      return response;
    })
    .catch(err => {
      //TODO: inject component to send error data
      console.log(err);
    })
  return result;
}

export default ulFGF;