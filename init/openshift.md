
./package.json
  "scripts": {
    "start": "node app.js",
    "postinstall": "export HOME=$OPENSHIFT_REPO_DIR;./node_modules/bower/bin/bower install",
    "debug": "node debug app.js"
  },

