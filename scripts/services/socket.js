'use strict';

angular.module('othello')
  .factory('socket', function ($rootScope) {
    var hostname = window.location.hostname;
    var socket = io.connect(window.location.protocol + '//' +
                            hostname + ':8088');

    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    };
  });
