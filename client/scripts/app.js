// YOUR CODE HERE:
var app = {
  init: function(){},
  send: function(message){
    $.ajax({
      type: "POST",
      url: "https://api.parse.com/1/classes/chatterbox",
      data: JSON.stringify(message)
    });
  },
  fetch: function(){
    $.ajax({
      type: "GET"
    });
  },
  clearMessages: function(){
    $('#chats').html('');
  },
  addMessage: function(message){
    $('#chats').append('<div></div>');
  },
  addRoom: function(roomName){
    $('#roomSelect').append('<div></div>');
  }
};

