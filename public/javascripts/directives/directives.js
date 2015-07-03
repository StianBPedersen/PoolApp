angular.module('pool.directives', [])
	.directive('modal', [function() {
		return {
			restrict: 'A',
			scope: true,
			link: function(scope, element, attrs) {
			
				if(attrs.modal === 'new') {
					scope.modalobj = {};
				}

				scope.dismiss = function() {
					if(attrs.modal === 'new') {
						scope.create();
					}else if(attrs.modal === 'edit') {
						scope.update();
					}
					element.modal('hide');
				};

				scope.keyPress = function(keycode) {
					if(+keycode === 13) scope.dismiss();
				};

				scope.create = function() {
					scope.$emit('modalNew', scope.modalobj);
					scope.modalobj = null;
				};

				scope.update = function() {
					scope.$emit('modalUpdate', scope.modalobj);
					scope.modalobj = null;
				};
				
				scope.save = function() {
					if(attrs.modal === 'new') {
						scope.create();
						element.modal('hide');
					}else if(attrs.modal === 'edit') {
						scope.update();
						element.modal('hide');
					}
				};
			}
		};
	}])

	.directive('confirm', ['$window', function($window) {
		return {
			priority: -1,
			restrict: 'A',
			scope: {
				func: '&ngClick',
				message: '@confirmPopupMessage'
			},
			link: function(scope, element, attrs){
				element.bind('click', function(e){
					e.stopImmediatePropagation();
					e.preventDefault();
					scope.showDialog(e);
				});

				var panel_id = "confirm_pop" + scope.$id;

				scope.showDialog = function(e) {
					var popupLeft = 50 - $window.Math.floor((((400 / $window.innerWidth) * 100) / 2));
					var popupTop = 50 - $window.Math.floor((((200 / $window.innerHeight) * 100) / 2));

					var pop = '<div id="'+panel_id+'" style="width: 400px;position:fixed;top: '+popupTop+'%;left:'+popupLeft+'%;z-index: 99999999;box-shadow: 0 0 0 1000px rgba(0,0,0,.9);" class="panel panel-default">' +
											'<div class="panel-heading" style="background-color:#fff;">' +
												'<h3 class="panel-title">Bekreft</h3>' +
											'</div>' +
											'<div class="panel-body">'+scope.message+'</div>' +
											'<div class="panel-footer clearfix" style="background-color: #fff;">' +
												'<a class="btn btn-info pull-right" id="confirm_popup_yes">Bekreft</a>' +
												'<a style="margin-right: 15px;" class="btn btn-default pull-right" id="confirm_popup_no">Avbryt</a>' +
											'</div>' +
										'</div>';

					$('body').append(pop);
				};

				$('body').on('click', " #"+panel_id+" #confirm_popup_yes", function() {
					$('#'+panel_id).remove();
					scope.func.call(scope.$parent);
				});

				$('body').on('click', '#confirm_popup_no', function() {
					$('#'+panel_id).remove();
				});
				
			}
		};
	}])