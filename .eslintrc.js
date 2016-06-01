module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "node": true
    },
   "extends": "eslint:recommended",
   "plugins": ["node","angular"],
    "rules": {
      	"no-use-before-define":0,
      	"no-console":0,
      	"no-undef": 1,
      	"no-unused-vars": 1,
      	"no-mixed-spaces-and-tabs": 1,
      	"node/no-deprecated-api": "error",
        "node/no-missing-import": "error",
        "node/no-missing-require": "error",
        "node/no-unpublished-import": "error",
        "node/no-unpublished-require": "error",
        "node/no-unsupported-features": ["error", {"version": 4}],
        "node/process-exit-as-throw": "error",
        "node/shebang": "error",
        "indent": [
            1,
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    },
    "globals": {
       "_": true,
       "sails":true,
       "angular":true
   },
};
