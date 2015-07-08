angular.module('pool.directives', [])
	.directive('modal', [function() {
		return {
			restrict: 'A',
			scope: true,
			link: function(scope, element, attrs) {
			
				if(attrs.modal === 'new') { scope.modalobj = {}; }

				scope.dismiss = function() {
					if(attrs.modal === 'new') {
						scope.create();
					}else if(attrs.modal === 'edit') {
						scope.update();
					}else if(attrs.modal === 'updateScore') {
						scope.updateScore();
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
				};

				scope.updateScore = function() {
					scope.$emit('modalUpdateScore', scope.modalobj);
				};
				
				scope.save = function() {
					if(attrs.modal === 'new') {
						scope.create();
						element.modal('hide');
					}else if(attrs.modal === 'edit') {
						scope.update();
						element.modal('hide');
					}else if(attrs.modal === 'updateScore') {
						scope.updateScore();
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
					var popupLeft = 50 - $window.Math.floor((((500 / $window.innerWidth) * 100) / 2));
					var popupTop = 50 - $window.Math.floor((((300 / $window.innerHeight) * 100) / 2));

					var pop = '<div id="'+panel_id+'" style="top: '+popupTop+'%;left:'+popupLeft+'%;" class="panel panel-popup panel-default">' +
											'<div class="panel-body">'+
												'<button type="button" id="confirm_popup_no2" class="close"><span aria-hidden="true">&times;</span></button>'+
												'<p><i class="fa fa-trash-o fa-4"></i></p>'+
												'<p class="msg">'+scope.message+'</p>'+
												'<a class="btn btn-default" id="confirm_popup_no">Cancel</a>' +
												'<span class="divider"></span>'+
												'<a class="btn btn-danger" id="confirm_popup_yes">Delete</a>' +
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

				$('body').on('click', '#confirm_popup_no2', function() {
					$('#'+panel_id).remove();
				});
				
			}
		};
	}])