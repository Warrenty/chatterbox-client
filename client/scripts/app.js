// YOUR CODE HERE:
var app = {
  init: function(filter){app.fetch(function(data){
          for(var i=data.length-1; i>=0; i--){
            if(filter===undefined || data[i].roomname === filter){
              app.addMessage(data[i]);
            }
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
    var $chat = $('<div class = "chat"></div>');
    if (_.contains(friends,message.username)){
      $chat.addClass('friends');
    }
    $chat.append('<span class="username">'+ message.username +'</span><span class="roomname">' + message.roomname + '</span><div class="text">'+ message.text +'</div>');
    if (message.text !== undefined && message.username && message.roomname &&
      message.text[0]!=='<' &&
      message.roomname[0]!=='<' &&
      message.username[0]!=='+'){
      $('#chats').prepend($chat);
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
/////////////////////////////////////////////////////////////////
var room;
var friends = [];

var refresh = function(filter){
  app.clearMessages();
  app.init(filter);
};

setInterval(function(){refresh(room)},2000);

$(document).ready(function(){
  app.init();
  $('button').on('click',function(){
    room = $('#roomname').val()
    app.send(
      {username:$('#username').val(), text:$('#text').val(), roomname: room}
      );
  });
  $(document).on('click','.username',function(){
    friends.push($(this).text());
  })
});




$('#main').on('click','.username',app.addFriend());

