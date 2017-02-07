const mostRecentBranchForCard = require('./github');
const buildJob = require('./jenkins');

const jobs = {
  UAT: 'EMMR/uat/1_configure_uat',
  Test: 'EMMR/test1/1_configure_test1'
};

module.exports = function deployCard(cardNumber, environment, done) {
  mostRecentBranchForCard(cardNumber)
    .then(branch => {
      // "Found branch _______, should I deploy it?"
      shouldContinue = true;

      if (shouldContinue) {
        if (jobs[environment]) {
          buildJob(jobs[environment], branch.sha, success => {
            if (success) {
              // "Successfully started deploy ____"
            } else {
              // "Failed for some reason"
            }
          });
        } else {
          // "Sorry, not sure what environment that is"
        }
      } else {
        // "Okay, cancelled"
      }
    });
}
