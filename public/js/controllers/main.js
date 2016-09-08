// js/controllers/main.js

angular.module('todoController', [])

    // inject Todo service factory into controller
    .controller('mainController', function($scope, $http, Todos) {
        $scope.formData = {};

        // GET
        // when landing on page, get all todos and display them
        Todos.get()
            .success(function(data) {
                $scope.todos = data;
            });

        // CREATE
        // when submitting add form, send the text to the node API
        $scope.createTodo = function() {

            // validate the formData to ensure form not empty
            if (!$.isEmptyObject($scope.formData)) {

                // call the create function from our service (returns promise object)
                Todos.create($scope.formData)

                    // if succcessfully created, call get function to get all new todos
                    .success(function(data) {
                        $scope.formData = {};  // clear the form so user can enter another
                        $scope.todos = data;
                    });
            }
        };

        // DELETE
        // delete a todo after checking it
        $scope.deleteTodo = function(id) {
            Todos.delete(id)
            // if successful creation, call get function to get new todos
            .success(function(data) {
                $scope.todos = data; // assign new list of todos
            });
        };
});