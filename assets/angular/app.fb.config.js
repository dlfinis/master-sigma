 (function () { 
'use strict';

 angular.module('app.fb.config', [])

.constant('FB', {clientID:{general:1267766483237355,zeus:1545700372110630,ares:1545715552109112,apolo:1545716165442384},permissions:'email,user_birthday,user_friends,publish_actions'})

.value('debug', false)

;
})();
