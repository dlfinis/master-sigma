 (function () { 
'use strict';

 angular.module('app.fb.config', [])

.constant('FB', {clientID:{general:198981923884649,zeus:199021257214049,ares:199027387213436,apolo:199030457213129},permissions:'email,user_birthday,user_friends,publish_actions'})

.value('debug', false)

;

})();