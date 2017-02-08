const JenkinsAPI = require('jenkins');

const jenkins = JenkinsAPI({
  baseUrl: 'https://jtoddy:ef47e92f9e30606755c6037a14c987c7@velocity-bento.aws-dev.manheim.com',
  crumbIssuer: true
});

module.exports = function buildJob(jobName, sha, done) {
  console.log('building job', jobName, 'with APP_REVISION', sha, '...');
  jenkins.job.build({
    name: jobName,
    parameters: { APP_REVISION: sha }
  }, err => {
    if (err) {
      console.log('error:', err);
    } else {
      console.log('success!');
    }
    done(!Boolean(err));
  });
}
