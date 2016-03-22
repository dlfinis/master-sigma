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
        database: 'msigmadb'
      },
    },
    models: {
      connection: 'sigmaDv',
      migrate: 'alter'
    },
    application_auth: {

        enableLocalAuth: true,

        // Get your keys from https://developers.facebook.com/apps/
        // module.exports.local = {
        enableFacebookAuth: true,
        facebookClientID: "1267766483237355",
        facebookClientSecret: "a2f5e3a27b74a64bc0d1ecc2d3a9ec31",
        facebookCallbackURL: "https://master.sigma/auth/facebook/callback",
        facebookAppURL: "https://apps.facebook.com/master-sigma/",
    },

};
