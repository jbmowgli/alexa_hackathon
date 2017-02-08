const express = require('express');

const mostRecentBranchForCard = require('./github');
const buildJob = require('./jenkins');

const jobs = {
  UAT: 'EMMR/uat/1_configure_uat',
  Test: 'EMMR/test1/1_configure_test1'
};

const app = express();

app.get('/search/:query', (req, res, next) => {
  const { query } = req.params;

  mostRecentBranchForCard(query).then(branch => {
    if (branch) {
      res.status(200).json(branch)
    } else {
      res.status(404).json({
        message: "I'm sorry, I couldn't find that branch."
      });
    }
    next();
  });
});

app.get('/deploy/:environment/:sha', (req, res, next) => {
  const { environment, sha } = req.params;

  if (jobs[environment]) {
    buildJob(jobs[environment], sha, success => {
      if (success) {
        res.status(200).json({
          message: 'Your deployment has been successfully started.'
        });
      } else {
        res.status(500).json({
          message: "I'm sorry, but something went wrong when talking to Jenkins."
        });
      }
      next();
    });
  } else {
    res.status(404).json({
      message: "I'm sorry, but that's not an environment I recognize."
    });
    next();
  }
});

app.listen(3030);
