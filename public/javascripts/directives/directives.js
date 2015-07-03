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