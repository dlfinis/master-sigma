// (function () {
//   'use strict';
//
//   function ModalCtrl($scope,$uibModalInstance)
//   {
//     var $modal = this;
//     $modal.items = ['item1', 'item2', 'item3'];
//
//       $modal.animationsEnabled = true;
//
//       $modal.open = function (size) {
//
//         var modalInstance = $uibModal.open({
//           animation: $modal.animationsEnabled,
//           templateUrl: 'myModalContent.html',
//           controller: 'ModalInstanceCtrl',
//           size: size,
//           resolve: {
//             items: function () {
//               return $modal.items;
//             }
//           }
//         });
//
//         modalInstance.result.then(function (selectedItem) {
//           $modal.selected = selectedItem;
//         }, function () {
//           $log.info('Modal dismissed at: ' + new Date());
//         });
//       };
//
//     $modal.ok = function () {
//       $uibModalInstance.close($modal.selected.item);
//     };
//
//     $modal.cancel = function () {
//       $uibModalInstance.dismiss('cancel');
//     };
//   }
//
//   angular.module('app.main.article.modal', [])
//          .controller('ModalCtrl',ModalCtrl)
//          .directive('modal', function(partial){
//            return {
//                restrict: 'E',
//                scope: {
//                  uid: "@",
//                  state: "="
//                },
//                controller: 'ModalCtrl',
//                controllerAs: '$modal',
//               templateUrl: partial.main.article+'tpl/modal.cmp.html'
//            };
//          });
//
// })();
