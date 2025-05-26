$(document).ready(function(){
  let score = 0;
  const $target = $('#target');
  const $targetPic = $('#targetPic');
  const $gameArea = $('#gameArea');
  const $score = $('#score');
  let gameOver = false;
  

  function moveTarget() {
    if (gameOver) return;
    // Hide both first
    $target.hide();
    $targetPic.hide();

    // Random visibility logic
    const showWhich = Math.floor(Math.random() * 5); 

    // Move & show #target
    if (showWhich === 0 || showWhich === 2  || showWhich === 3 || showWhich === 4 || showWhich === 5) {
      const maxX = $gameArea.width() - $target.width();
      const maxY = $gameArea.height() - $target.height();
      const randomX = Math.floor(Math.random() * maxX);
      const randomY = Math.floor(Math.random() * maxY);
      const randomColor = `rgb(${rand()}, ${rand()}, ${rand()})`;


      const shapes = [
    { borderRadius: "0%", width: 50, height: 50 },      // square
    { borderRadius: "50%", width: 50, height: 50 },     // circle
    { borderRadius: "30%", width: 60, height: 40 },     // oval
    { borderRadius: "10%", width: 70, height: 70 }      // rounded square
  ];
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

  
      $target.css({
         top: randomY + 'px',
         left: randomX + 'px',
         backgroundColor: randomColor,
         width: randomShape.width + 'px',
         height: randomShape.height + 'px',
         borderRadius: randomShape.borderRadius
        
      }).fadeIn(100);
    }

    // Move & show #targetPic
    if (showWhich === 1 || showWhich === 5) {
      const maxM = $gameArea.width() - $targetPic.width();
      const maxN = $gameArea.height() - $targetPic.height();
      const randomM = Math.floor(Math.random() * maxM);
      const randomN = Math.floor(Math.random() * maxN);

      $targetPic.css({
        top: randomN + 'px',
        left: randomM + 'px'
      }).fadeIn(100);
    }
  }
  
   function checkGameOver() {
    if (score < -2) {
      gameOver = true;
      //clearInterval(gameInterval);
      $target.hide();
      $targetPic.hide();
      alert("💀 Game Over! Your score dropped below -15.");
    }
  }

  function rand() {
    return Math.floor(Math.random() * 256);
  }

  // Show and move target every second
  setInterval(moveTarget, 1000);

  // On hit
  $target.on('click', function(e) {
    score++;
    $score.text('Score: ' + score);
    $target.fadeOut(100);
    checkGameOver();
    e.stopPropagation();  });

  $targetPic.on('click', function(e) {
    score += 5; 
    $score.text('Score: ' + score);
    $targetPic.fadeOut(100);
    checkGameOver();
    e.stopPropagation();  
  });

  // Missed shot
  $gameArea.on('click', function() {
    score--;
    $score.text('Score: ' + score);
    checkGameOver();

  });

  
});
