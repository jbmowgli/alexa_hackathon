require('isomorphic-fetch');

// These will come from Alexa input
const environment = 'Test';
const search = '64837';

let searchStatus, deployStatus;
fetch('http://localhost:3030/search/' + search)
  .then(response => {
    searchStatus = response.status;
    return response.json();
  })
  .then(body => {
    if (searchStatus !== 200) {
      console.log(body.message);
    } else {
      console.log('Deploying the branch.');
      fetch('http://localhost:3030/deploy/' + environment + '/' + body.sha)
        .then(response => {
          deployStatus = response.status;
          return response.json();
        })
        .then(body => {
          console.log(body.message);
        });
    }
  });
