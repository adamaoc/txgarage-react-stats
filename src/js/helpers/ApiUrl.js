const APIURL = (path) => {
  // const loc = window.location;
  // if (loc.hostname === 'localhost') {
  //   return 'http://localhost:8888/' + path;
  // }
  return 'http://api.txgarage.com/' + path;
};

export default APIURL;
