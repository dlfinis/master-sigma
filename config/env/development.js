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
      sigmadbDv: {
        adapter: 'sails-mysql',
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'sigmadb'
      },
    },
    models: {
      connection: 'sigmadbDv',
      migrate: 'alter'
    },
    application_auth: {

        enableLocalAuth: true,

        // Get your keys from https://apps.twitter.com/
        enableTwitterAuth: false,
        twitterConsumerKey: "",
        twitterSecretKey: "",
        twitterCallbackURL: "http://localhost:1337/auth/twitter/callback",

        // Get your keys from https://developers.facebook.com/apps/
        // module.exports.local = {
        enableFacebookAuth: true,
        facebookClientID: "1267766483237355",
        facebookClientSecret: "a2f5e3a27b74a64bc0d1ecc2d3a9ec31",
        facebookCallbackURL: "http://localhost:1337/auth/facebook/callback"
    },

};
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

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/
    connections: {
      sigmadbDv: {
        adapter: 'sails-mysql',
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'sigmadb'
      },
    },
    models: {
      connection: 'sigmadbDv',
      migrate: 'alter'
    },
    application_auth: {

        enableLocalAuth: true,

        // Get your keys from https://apps.twitter.com/
        enableTwitterAuth: false,
        twitterConsumerKey: "",
        twitterSecretKey: "",
        twitterCallbackURL: "http://localhost:1337/auth/twitter/callback",

        // Get your keys from https://developers.facebook.com/apps/
        // module.exports.local = {
        enableFacebookAuth: true,
        facebookClientID: "1267766483237355",
        facebookClientSecret: "a2f5e3a27b74a64bc0d1ecc2d3a9ec31",
        facebookCallbackURL: "http://localhost:1337/auth/facebook/callback"
    },

};
