/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */
module.exports = {
  grunt: {
    _hookTimeout: 60000
  },
  connections: {
    sigmaDv: {
      adapter: 'sails-mysql',
      host: 'localhost',
      user: 'root',
      password: 'root',
      // database: 'mastersigma'
      database: 'msigmadb'
    }
  },
  models: {
    schema: true,
    connection: 'sigmaDv',
    migrate: 'safe'
  },
  application_auth: {
    enableLocalAuth: true,
    // Get your keys from https://developers.facebook.com/apps/
    // module.exports.local = {
    enableFacebookAuth: true,
    facebookClientID: '1267766483237355',
    facebookClientSecret: 'a2f5e3a27b74a64bc0d1ecc2d3a9ec31',
    // facebookCallbackURL: 'https://master.sigma/auth/facebook/callback',
    facebookCallbackURL: 'https://master.sigma/auth/facebook/callback',
    facebookAppURL: 'https://apps.facebook.com/master-sigma/'
  },
  session: {
    adapter: 'redis',
    host: process.env.REDISCLOUD_URL || 'pub-redis-12873.us-east-1-1.2.ec2.garantiadata.com',
    port: process.env.REDISCLOUD_PORT || 12873,
    ttl: 1800,
    pass: process.env.REDISCLOUD_PASSWORD || 'mastersigma92',
    cookie: {
      maxAge: 6 * 60 * 60 * 1000
    }
  },
  // ssl: {
  //   ca: require('fs').readFileSync(__dirname + '/ssl/server.crt'),
  //   key: require('fs').readFileSync(__dirname + '/ssl/server.key'),
  //   cert: require('fs').readFileSync(__dirname + '/ssl/server.crt')
  // },
  port: process.env.PORT || 1337,
  scraper : {
    url: 'http://'+'127.0.0.1'+':'+3100
  },
  log: {
    level: 'verbose'
  }
};
