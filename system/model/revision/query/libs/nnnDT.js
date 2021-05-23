
const nnndt = async (cn, fgn, fn, dt) => {
  console.log(cn, fgn, fn, dt)
  const API = `/api/c/create/nnndt`;
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
        cn: cn,
        fgn: fgn,
        fn: fn, 
        dt: dt,
      }
    ) // body data type must match "Content-Type" header
  })
    .then(response => response.json())
    .then(response => {
      return response;
    })
    .catch(err => {
      //TODO: inject component to send error data
      console.log(err);
    })
  return result;
}

export default nnndt;