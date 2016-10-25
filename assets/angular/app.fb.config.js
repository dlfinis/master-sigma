 (function () { 
'use strict';

 angular.module('app.config', [])

.constant('FB', {clientID:'1267766483237355',permissions:'email,user_birthday,user_friends,publish_actions'})

.value('debug', false)

;

})();