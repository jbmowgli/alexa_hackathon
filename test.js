require('isomorphic-fetch');

const api = 'http://667ab17c.ngrok.io';

// These will come from Alexa input
const environment = 'UAT';
const search = '65095';

let searchStatus, deployStatus;
fetch(api + '/search/' + search)
  .then(response => {
    searchStatus = response.status;
    return response.json();
  })
  .then(body => {
    if (searchStatus !== 200) {
      console.log(body.message);
    } else {
      console.log('Deploying the branch.');
      fetch(api + '/deploy/' + environment + '/' + body.sha)
        .then(response => {
          deployStatus = response.status;
          return response.json();
        })
        .then(body => {
          console.log(body.message);
        });
    }
  });
