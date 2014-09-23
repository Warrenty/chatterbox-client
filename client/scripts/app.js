// YOUR CODE HERE:
var app = {
  init: function(){app.fetch(function(data){
        console.log(data);
          for(var i=data.length-1; i>=0; i--){
            console.log(data[i]);
            app.addMessage(data[i]);
          }
        })},
  send: function(message){
    $.ajax({
      type: "POST",
      url: "https://api.parse.com/1/classes/chatterbox",
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data){
        console.log('chatterbox: Message sent');
      },
      error: function(data){
        console.error("chatterbox: Failed to send message");
      }
    });
  },
  fetch: function(func){
    $.ajax({
      type: "GET",
      url: "https://api.parse.com/1/classes/chatterbox",
      contentType: 'application/json',
      data: {order: '-createdAt'},
      success: function(data){
          func(data.results);
      }
    });
  },
  clearMessages: function(){
    $('#chats').html('');
  },
  addMessage: function(message){
    console.log(message);
    var $chat = $('<div class = "chat"></div>');
    $chat.append('<span class="username">'+ message.username +'</span><span class="roomname">' + message.roomname + '</span><span>'+ message.createdAt +'</span><div class="text">'+ message.text +'</div>');
    if (message.text !== undefined && message.username && message.roomname &&
      message.text[0]!=='<' &&
      message.roomname[0]!=='<' &&
      message.username[0]!=='+'){
      $('#chats').prepend($chat);
      // console.log($chat);
    }
  },
  addRoom: function(roomName){
    $('#roomSelect').append('<div></div>');
  },
  addFriend: function(){console.log('added friend')},
  update: function(){
    app.fetch();
  }
};

$('#main').on('click','.username',app.addFriend());

