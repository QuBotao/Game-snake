require('./TCL.css');

function getStyle(obj,prop) {
      if(obj.currentStyle) {
          return obj.currentStyle[prop];
      }else{
         return window.getComputedStyle(obj,null)[prop];
      }
    }
   
   var mySnake = document.getElementById('my-snake');
   var snake = document.getElementById('snake-head');
   var speed = 20;
   var speedd = -20;
    
    //蛇头的移动
      var timer;
      var oWrapper = document.getElementById('wrapper');
      var disXLeft = parseInt(getStyle(snake, 'left')) + 'px';
      var disYTop = parseInt(getStyle(snake, 'top')) + 'px';
      var disXRight = parseInt(getStyle(snake, 'left')) + 20 + 'px';
      var disYBottom = parseInt(getStyle(snake, 'top')) + 20 + 'px';
      var key = 0;
      
      function  vars() {
        snakeBody = document.getElementsByClassName("snake");
        len = snakeBody.length;
        lastLeft = parseInt(snakeBody[len - 1].style.left);
        lastTop = parseInt(snakeBody[len - 1].style.top);
      }

      function food() {
        var ranT = Math.random() * 580;
        var ranL = Math.random() * 780;
        var xTop = ranT - ranT%20;
        var xLeft =  ranL - ranL%20;
        var oFood = document.createElement('div');
        oFood.className = 'food';
        oFood.style.top = xTop + 'px';
        oFood.style.left = xLeft + 'px';
        oWrapper.appendChild(oFood);
      }
      food();

      document.onkeydown = function (e) {
          var event = e || window.event;
          if(event.which == '37' && key != 39){ 
               window.clearInterval(timer);
                  timer = window.setInterval( function () {
                      vars();
                      changePosition();
                      snake.style.left = parseInt(getStyle(snake, 'left')) + speedd + 'px';
                      disXLeft = snake.style.left;
                        if(disXLeft < 0 + 'px'){
                           snake.style.left = 780 + 'px';
                        }
                  eat();
                  dead();
                },100);
          }else if(event.which == '38' && key != 40){
             window.clearInterval(timer);
                timer = window.setInterval( function () {
                  vars();
                  changePosition();
                  snake.style.top = parseInt(getStyle(snake, 'top')) + speedd + 'px';
                  disYTop = snake.style.top;
                    if(disYTop < 0 + 'px'){
                        snake.style.top = 580 + 'px';
                    }
                  eat();
                  dead(); 
                },100);
          }else if(event.which == '39' && key != 37){  
             window.clearInterval(timer);
                timer =  window.setInterval( function () {
                  vars();
                  changePosition();
                  snake.style.left = parseInt(getStyle(snake, 'left')) + speed + 'px';
                  disXLeft = snake.style.left;
                  disXRight = snake.style.left;
                    if(parseInt(disXRight) > 780){
                      snake.style.left = 0 + 'px';
                    }
                    eat();
                    dead();
                },100);
          }else if(event.which == '40' && key != 38){ 
                window.clearInterval(timer);
                timer =  window.setInterval( function () {
                  vars();
                  changePosition();
                  snake.style.top = parseInt(getStyle(snake, 'top')) + speed + 'px';
                  disYBottom = snake.style.top;
                  disYTop = snake.style.top;
                    if(parseInt(disYBottom) > 580){
                        snake.style.top = 0 + 'px';
                    }
                  eat();
                  dead();
                },100);
          }
                 key = event.which;
        }  

      
        function dead () {
          for(var i = 1; i < len;i++) {
            if(parseInt(disXLeft) == parseInt(snakeBody[i].style.left) && parseInt(disYTop) == parseInt(snakeBody[i].style.top)){
              clearInterval(timer);
              alert('你死了');
            }
          }
        }

      function changePosition() {
        var child = snakeBody;
        var len = child.length;
        for(var i = len - 1; i > 0; i--){
            child[i].style.top = parseInt(getStyle(child[i-1], 'top')) + 'px';
            child[i].style.left = parseInt(getStyle(child[i-1], 'left') + 'px');
          } 
      }
    
    function eat () {
      var oFood = document.getElementsByClassName('food')[0];
      var headLeft = getStyle(oFood, 'left');
      var headTop = getStyle(oFood, 'top');
      if(headLeft == disXLeft && headTop == disYTop) {
        oWrapper.removeChild(oFood);
        food();
        var oSnakeBody = document.createElement('div');
        oSnakeBody.className = 'snake';
        oSnakeBody.style.left = lastLeft + 20 + 'px';
        oSnakeBody.style.top = lastTop + 20 + 'px';
        mySnake.appendChild(oSnakeBody);
      }
    }
