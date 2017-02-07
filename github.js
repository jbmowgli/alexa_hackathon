const GitHubAPI = require('github');


////////////////////////////////////////////////////////////////////////////////
// Public API

module.exports = function mostRecentBranchForCard(number) {
  return getBranches()
    .then(filterByNameIncludes(number))
    .then(addTimestamps)
    .then(onlyMostRecent)
    .then(cleanUpForReturn)
    .catch(err => null); // Any error means NO RESULT FOR YOU!
}


////////////////////////////////////////////////////////////////////////////////
// Helpers

const github = new GitHubAPI({
  protocol: 'http',
  host: 'github.ove.local',
  pathPrefix: '/api/v3',
  headers: {
    'user-agent': 'Alexa-MMR-Deployer'
  }
});

function getBranches() {
  return github.repos.getBranches({
    owner: 'Velocity',
    repo: 'emmr-frontend',
    per_page: 100
  });
}

function filterByNameIncludes(string) {
  return branches => branches.filter(branch => branch.name.includes(string));
}

function getCommit(branch) {
  return github.gitdata.getCommit({
    owner: 'Velocity',
    repo: 'emmr-frontend',
    sha: branch.commit.sha
  });
}

function addTimestamps(branches) {
  return Promise.all(branches.map(getCommit))
    .then(commits => branches.map((branch, i) => Object.assign({}, branch, {
      timestamp: new Date(commits[i].meta['last-modified'])
    })));
}

function onlyMostRecent(branches) {
  return branches.sort((a, b) => b.timestamp - a.timestamp)[0];
}

function cleanUpForReturn(branch) {
  branch.sha = branch.commit.sha;
  delete branch.commit;
  return branch;
}
