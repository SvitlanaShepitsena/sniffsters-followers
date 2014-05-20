/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />

var myDirective = function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/my-directive.html',
        transclude: true,
        // replace directive tag with template info
        replace: true,
        scope: {
            ctrl: '=',
            text: '@',
            func: '&'
        },
        link: function (scope, element, attrs) {
            //            SCOPE (USE just {{test}} . )
            scope.test = 'Test from link scope';
        }
    };
};
//# sourceMappingURL=myDirective.js.map
