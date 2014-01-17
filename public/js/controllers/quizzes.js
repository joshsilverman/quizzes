'use strict';

angular.module('mean.quizzes').controller('QuizzesController', ['$scope', '$routeParams', '$location', 'Global', 'Quizzes', function ($scope, $routeParams, $location, Global, Quizzes) {
    $scope.global = Global;

    $scope.create = function() {
        var quiz = new Quizzes({
            title: this.title,
            content: this.content
        });
        quiz.$save(function(response) {
            $location.path('quizzes/' + response._id);
        });

        this.title = '';
        this.content = '';
    };

    $scope.remove = function(quiz) {
        if (quiz) {
            quiz.$remove();

            for (var i in $scope.quizzes) {
                if ($scope.quizzes[i] === quiz) {
                    $scope.quizzes.splice(i, 1);
                }
            }
        }
        else {
            $scope.quiz.$remove();
            $location.path('quizzes');
        }
    };

    $scope.update = function() {
        var quiz = $scope.quiz;
        if (!quiz.updated) {
            quiz.updated = [];
        }
        quiz.updated.push(new Date().getTime());

        quiz.$update(function() {
            $location.path('quizzes/' + quiz._id);
        });
    };

    $scope.find = function() {
        Quizzes.query(function(quizzes) {
            $scope.quizzes = quizzes;
        });
    };

    $scope.findOne = function() {
        Quizzes.get({
            quizId: $routeParams.quizId
        }, function(quiz) {
            $scope.quiz = quiz;
        });
    };
}]);