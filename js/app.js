(function (angular) {
    'use strict';
    
    var app = angular.module('pick-me', ['storage.services']);
    
    var PUPILS_STORAGE_KEY = 'pupils';
    
    app.config(function ($routeProvider) {
        $routeProvider.when(
            '/picker',
            {
                templateUrl: 'partials/picker.html',
                controller: 'PickerController'
            }
        );
        $routeProvider.when(
            '/pupils',
            {
                templateUrl: 'partials/pupils.html',
                controller: 'PupilController'
            }
        );
        
        $routeProvider.otherwise({redirectTo: '/picker'});
    });
    
    app.controller('PickerController', function ($scope, localstorage) {
        var pupils = localstorage.get(PUPILS_STORAGE_KEY) || [];
        $scope.pupils = pupils;
        
        var current_person;
        
        $scope.pick_pupil = function () {
            var person = get_new_person_at_random();
            
            for (var i=0; i<12; i++) {
                angular.element('.cog:eq(' + i + ')').attr('class', 'cog space');
            }
            
            for (var i=0; i<person.length; i++) {
                var letter = person.substr(i, 1).toUpperCase();
                angular.element('.cog:eq(' + i + ')').addClass('letter-' + letter);
            }
        };
        
        var get_new_person_at_random = function () {
            var person;
            while (person = pick_person_at_random()) {
                if (person !== current_person) {
                    current_person = person;
                    break;
                }
            }
            return person;
        };
        
        var pick_person_at_random = function () {
            var person_count = pupils.length;
            var random_index = Math.round(Math.random() * (person_count - 1));
            return pupils[random_index];
        };
    });
    
    app.controller('PupilController', function ($scope, $location, localstorage) {
        var pupils = localstorage.get('pupils') || [];
        $scope.pupils_data = pupils.join('\n');
        
        $scope.save_pupils = function () {
            var cleaned_pupils = clean_pupils_data($scope.pupils_data);
            localstorage.put(PUPILS_STORAGE_KEY, cleaned_pupils);
            $location.path('/picker');
        };
        
        var clean_pupils_data = function (pupils_data) {
            var pupils = [];
            var raw_pupils = pupils_data.split('\n');
            angular.forEach(raw_pupils, function (raw_pupil) {
                var clean_pupil = trim(raw_pupil);
                if (clean_pupil) {
                    pupils.push(clean_pupil);
                }
            });
            return pupils;
        };
    });
    
    var trim = function (string) {
        return (string || '').replace(/^\s+/, '').replace(/\s+$/, '');
    };
    
})(window.angular);
