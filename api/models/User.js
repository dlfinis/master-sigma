/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt-nodejs');

module.exports = {
    schema: true,
    attributes: {
        provider: 'STRING',
        uid: 'STRING',
        name: 'STRING',
        email: 'STRING',
        firstname: 'STRING',
        lastname: 'STRING',
        gender: 'STRING',
        profileUrl: 'STRING',
        password: 'STRING',
        // Add a reference to Article
        articles: {
          collection: 'article',
          via: 'creator',
        },
        // Add a reference to Like
        likes: {
          collection: 'like',
          via: 'user',
        },
        // Add a reference to Like
        shares: {
          collection: 'share',
          via: 'user',
        },
    },

    // Generating a hash
    generateHash: function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },

    // Checking if password is valid
    validPassword: function (user, password) {
        try {
            return bcrypt.compareSync(password, user.password);
        }
        catch (exception) {
            return false;
        }
    }
};
