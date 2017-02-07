function buildJob (jobName, sha, done){
  const jenkins = require('jenkins')({baseUrl: 'https://jtoddy:ef47e92f9e30606755c6037a14c987c7@velocity-bento.aws-dev.manheim.com',  crumbIssuer: true})
  jenkins.job.build({ name: jobName, parameters: { APP_REVISION: sha } }, function(err){
    if (err) { done(false) } else { done(true) }
  });
}

export { buildJob };
