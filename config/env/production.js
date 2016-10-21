/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  grunt: {
    _hookTimeout: 120000
  },

  application_auth: {
    enableLocalAuth: true,

    // Get your keys from https://developers.facebook.com/apps/
    enableFacebookAuth: true,
    facebookClientID: process.env.FB_ID || '1267766483237355',
    facebookClientSecret: process.env.FB_SECRET || 'a2f5e3a27b74a64bc0d1ecc2d3a9ec31',
    facebookAppScopeString: 'email,user_birthday,user_friends,publish_actions',
    facebookAppScope: [ 'email,user_birthday','user_friends','publish_actions'],
    facebookCallbackURL: 'https://'+(process.env.HOSTNAME || 'master.sigma')+(process.env.SUB_HOSTNAME || '')+'/auth/facebook/callback',
    facebookAppURL: 'https://apps.facebook.com/'+(process.env.FB_APPNAME || 'master-sigma/')
  },

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/
  errors:{
	global: true
  },
  paths: {
        public: 'www'
  },
  connections: {
    sigmaDB: {
      adapter: 'sails-mysql',
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'sigma',
      password: process.env.DB_PASSWORD || 'sigma2016',
      database: process.env.DB  || 'db_sigma'
    }
  },
  models: {
    schema: true,
    connection: 'sigmaDB',
    migrate: 'safe'
  },
  session: {
    adapter: 'redis',
    host: process.env.REDIS_HOST || 'pub-redis-12873.us-east-1-1.2.ec2.garantiadata.com',
    port: process.env.REDIS_PORT || 12873 || 6379,
    ttl: 3600,
    pass: process.env.REDIS_PASSWORD || 'mastersigma92' || '',
    cookie: {
      maxAge: 1 * 60 * 60 * 1000
    }
  },
  /***************************************************************************
  * Set the port in the production environment to 80                        *
  ***************************************************************************/
  host: process.env.NODE_HOST || '127.0.0.1',

  //port: process.env.NODE_PORT || 8080,
  port: process.env.PORT || 1337,

  environment: process.env.NODE_ENV || 'development',

  scraper : {
    url: 'http://'+ (process.env.NODE_HOST || '127.0.0.1') +':'+ process.env.SCRAPER_PORT || 3100
  },
  /***************************************************************************
   * Set the log level in production environment to 'silent'/'verbose'/'silly'*
   ***************************************************************************/
  log: {
    level: 'silent'
  }

};
