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
        _hookTimeout: 100000
    },

    application_auth: {
        enableLocalAuth: true,

        // Get your keys from https://developers.facebook.com/apps/
          enableFacebookAuth: true,
          facebookClientID: "1267766483237355",
          facebookClientSecret: "a2f5e3a27b74a64bc0d1ecc2d3a9ec31",
          facebookCallbackURL: "https://mastersigma-jaggerfly.rhcloud.com/auth/facebook/callback",
          facebookAppURL: "https://apps.facebook.com/master-sigma/",
    },

    /***************************************************************************
     * Set the default database connection for models in the production        *
     * environment (see config/connections.js and config/models.js )           *
     ***************************************************************************/

     connections: {
      // Heroku Deploy
    //  sigmaDv: {
    //      adapter: 'sails-mysql',
    //      host: 'us-cdbr-iron-east-03.cleardb.net',
    //      user: 'bad812654b4b13',
    //      password: 'eed57ee2',
    //      database: 'heroku_1014650bcf2946e'
    //     },
       sigmaPrd: {
         adapter: 'sails-mysql',
         host: process.env.OPENSHIFT_MYSQL_DB_HOST ,
         port: process.env.OPENSHIFT_MYSQL_DB_PORT,
         // Openshift Deploy
         user: 'admin2gbmiNI',
         password:'lJPfcp7n6ViH' ,
         database: 'mastersigma'
       },
     },
     models: {
       schema: true,
       connection: 'sigmaPrd',
       migrate: 'safe'
     },

    //session: {
    //    adapter: 'mongo',
    //    host: 'localhost',
    //    port: 27017,
    //    db: 'sails-auth',
    //    collection: 'sessions'
    //}

    // models: {
    //   connection: 'someMysqlServer'
    // },

    /***************************************************************************
     * Set the port in the production environment to 80                        *
     ***************************************************************************/
     host: process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1",

     port: process.env.OPENSHIFT_NODEJS_PORT || 8080,
    //  port: process.env.PORT || 1337,

     environment: process.env.NODE_ENV || 'development',

     scraper : {
        url: 'https://'+ process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1" +':'+3000
     },
    /***************************************************************************
     * Set the log level in production environment to "silent"                 *
     ***************************************************************************/

    log: {
      level: 'silent'
    }

};
