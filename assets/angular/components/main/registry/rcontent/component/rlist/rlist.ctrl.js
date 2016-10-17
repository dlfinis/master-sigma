(function (module) {

  function RListCtrl($location, $q, $log, $element, $timeout, RListFactory){

    var $rlist = this;

    $rlist.back = function () {
      $rlist.return = true;
      window.history.back();
    };

    RListFactory.getCreator().then(function (response) {
        console.log(response);
    });

    $rlist.contentList = [];

    $rlist.init = function () {
      $q.when(RListFactory.getContentList()).then(function (contentList) {
        if(contentList)
        {
          contentList = contentList.map(function(cElem, index, arr) {
            var content = {
              id : cElem.id,
              title : cElem.title,
              likes : cElem.likes,
              shares : cElem.shares,
              visits : cElem.visits,
              state : cElem.state === 'disable' ? 'En revisión' : cElem.state === 'edit' ? 'Editado':'Creado',
              date : cElem.date
            };
            return content;
          });
        }
          $rlist.contentList = contentList;
      })
      .catch(function (err) {
        $log.error(err);
      });
    };


    $rlist.editContent = function (contentID) {
      RListFactory.editContent(contentID);
    };

    $rlist.removeContent = function (content) {
      RListFactory.deleteContent(content.id).then(function (response) {
        if(response)
        {
          var index = $rlist.contentList.indexOf(content);
          if (index != -1) {
            $rlist.contentList.splice(index, 1);
          }

          $rlist.delete = { status: true,content: $rlist.content };
          $timeout(function () {
            $rlist.delete = {};
          }, 1500);
        }
      });
    };

  }

  module.controller('RListCtrl',RListCtrl);

})(angular.module('app.main.registry.rcontent.rlist'));
