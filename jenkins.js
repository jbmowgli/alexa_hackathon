const Jenkins = require('Jenkins');

module.exports = function buildJob(jobName, sha, done){
  const jenkins = Jenkins({
    baseUrl: 'https://jtoddy:ef47e92f9e30606755c6037a14c987c7@velocity-bento.aws-dev.manheim.com',
    crumbIssuer: true
  });

  jenkins.job.build({
    name: jobName,
    parameters: { APP_REVISION: sha }
  }, err => {
    done(!Boolean(err));
  });
}
