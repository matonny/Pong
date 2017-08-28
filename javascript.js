(function(){
    let canvas;
    let canvasContext;
    let ballX = 50;
    let ballY = 50;
    let ballSpeedX = 10;
    let ballSpeedY = 4;
    let ballWidth = 10;
    let ballHeigth = 10;

    let player1Score = 0;
    let player2Score = 0;
    const WINNING_SCORE = 3;

    let showingWinScreen = false;

    let paddle1Y = 250;
    let paddle2Y = 250;
    const PADDLE_THICKNESS = 10;
    const PADDLE_HEIGHT = 100;

    function calculateMousePos(evt){
        var rect = canvas.getBoundingClientRect();
        var root = document.documentElement;
        var mouseX = evt.clientX - rect.left - root.scrollLeft;
        var mouseY = evt.clientY - rect.top - root.scrollTop;
        return {
            x:mouseX,
            y:mouseY 
        };
    }

    window.onload = function(){
        canvas = document.getElementById('gameCanvas');
        canvasContext = canvas.getContext('2d');
        var framesPerSecond = 60;
        setInterval(function(){
            moveEverything();
            drawEverything();  
        }, 1000/framesPerSecond);      

        canvas.addEventListener('mousedown', handleMouseClick);
        canvas.addEventListener('mousemove',
            function(evt){
                var mousePos = calculateMousePos(evt);
                paddle1Y = mousePos.y;
            }) 
    }
    function handleMouseClick(evt){
        if(showingWinScreen){
            player1Score = 0;
            player2Score = 0;
            showingWinScreen = false;   
        }
    }
    function ballReset(){
        if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE){
            showingWinScreen = true;

        }
        ballX = canvas.width/2;
        ballY = canvas.height/2; 
        ballSpeedX = -ballSpeedX;
    }
    function computerMovement(){
        var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
        if(paddle2YCenter < ballY-35){
            paddle2Y +=  5;
        } else if(paddle2YCenter > ballY+35){
            paddle2Y -= 5;
        }
    }
    function moveEverything(){
        
        computerMovement();
        ballX += ballSpeedX;
        ballY += ballSpeedY;
        
        if(ballX < 0){
            if(ballY > paddle1Y &&
               ballY < paddle1Y+PADDLE_HEIGHT){
                ballSpeedX = -ballSpeedX;

                var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);               
                ballSpeedY = deltaY * 0.35;
            }else{
                player2Score +=1;
                ballReset();
            }
        }
        if(ballX > canvas.width){
            if(ballY > paddle2Y && ballY < paddle2Y+ PADDLE_HEIGHT){
                ballSpeedX = -ballSpeedX;

                var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);               
                ballSpeedY = deltaY * 0.35;
            }else{
                player1Score +=1;
                ballReset();
                
            }
        }
        if(ballY > canvas.height){
            ballSpeedY = -ballSpeedY;
        }else if(ballY < 0){
            ballSpeedY = -ballSpeedY;
        }
        
    }
    function drawNet(){
        for(let i = 0; i < canvas.height; i+=40){
            colorRect(canvas.width/2-1, i, 2, 20, 'white');
        }
    }
    function drawEverything(){
        
        colorRect(0, 0, canvas.width, canvas.height, 'black');
        if(showingWinScreen){
            canvasContext.fillStyle = 'white';
            if(player1Score >= WINNING_SCORE){
                    canvasContext.fillText('Left Player Won!', 350, 200);
            }else if(player2Score >= WINNING_SCORE){
                canvasContext.fillText('Right Player Won!', 350, 100);                
            }
            canvasContext.fillText('click to continue', 350, 500);
            return;
        }
        drawNet();
        colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
        colorRect(canvas.width-PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
        colorCircle(ballX+10, ballY, 10, 'white');
        canvasContext.fillText(player1Score, 100, 100);
        canvasContext.fillText(player2Score, 700, 100);
        
    }
    function colorRect(leftX, topY, width, height, drawColor){
        canvasContext.fillStyle = drawColor;
        canvasContext.fillRect(leftX, topY, width, height);
    }
    function colorCircle(centerX, centerY, radius, drawColor){
        canvasContext.fillStyle = drawColor;
        canvasContext.beginPath();
        canvasContext.arc(centerX, centerY, 10, 0, Math.PI*2, true);
        canvasContext.fill();
    }
})();