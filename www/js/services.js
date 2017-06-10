var cb = new ClearBlade();
angular.module('starter.services', [])


.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  var getdevices = function(){

        cb.init({
          URI: 'https://machineq.clearblade.com',  // e.g., 'https://platform.clearblade.com/'
          systemKey: 'e8edb9920bac9df3faf1f79cc5bd01',
          systemSecret: 'E8EDB9920BC6DBF197EFFFDCFC59',
          email: "cs9stephen@gmail.com",  // use registerEmail instead if you wish to create a new user
          password: "test01",
          callback: initCallback,
        });

        function initCallback(err, cbb) {
            var callback = function (err, data) {
        if (err) {
          console.log("fetch error : " + JSON.stringify(data));
        } else {
          //data = JSON.parse(JSON.stringify(data));
          data.sort(function(x, y){
          return x.time - y.time;
          })
          return data
        }
        };
        var query = cb.Query({collectionName: "Sensor Data"});
        query.fetch(callback);



         // err is a boolean, cb has APIs and constructors attached




          }
        }


  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    },
    getdevices:getdevices
  };
});
