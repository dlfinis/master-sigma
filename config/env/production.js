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
    facebookClientID: process.env.FB_ID || process.env.FB_ID_GENERAL,
    facebookClientSecret: process.env.FB_SECRET || process.env.FB.SECRET_GENERAL,
    facebookAppProfileField:[ 'id','displayName','name','gender','emails','birthday','about','profileUrl'],
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
    global: false
  },
  paths: {
    public: 'www'
  },
  connections: {
    sigmaDB: {
      adapter: process.env.DB_ADAPTER,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    }
  },
  models: {
    schema: true,
    connection: 'sigmaDB',
    migrate: 'safe'
  },
  session: {
    adapter: 'redis',
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    ttl: 1.75 * 60 * 60,
    pass: process.env.REDIS_PASSWORD || '',
    cookie: {
      maxAge: 1.75 * 60 * 60 * 1000
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
    level: process.env.LOG_ENV || 'silent'
  }

};
