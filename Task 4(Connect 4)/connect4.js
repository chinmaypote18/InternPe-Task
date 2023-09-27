var player1 = prompt("Player 1: Enter your Name ( You will be color Blue )");
var player1color='rgb(86, 151, 255)';

var player2 = prompt("Player 2: Enter your Name ( You will be color Red )");
var player2color='rgb(237, 45, 73)';

var game_on=true;
var table=$('table tr');

function reportWin(rowNum, colNum){
  console.log("You won starting at this row, column:");
  console.log(rowNum);
  console.log(colNum);
}

function changeColor(rowIndex, colIndex, color){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

function checkColor(rowIndex, colIndex){
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex){
  var colorReport = checkColor(5,colIndex);
  for(var row=5;row > -1;row--){
    colorReport=checkColor(row,colIndex);
    if(colorReport === 'rgb(128, 128, 128)'){
      return row
    }
  }
 }

function colorMatchCheck(one, two,three,four){
  return (one === two && two === three && three === four && one!== 'rgb(128, 128, 128)' && one!== undefined)
}

function horizontalCheck(){
  for(var row=0;row<6;row++){
    for(var col=0;col<4;col++){
      if(colorMatchCheck(checkColor(row,col),checkColor(row,col+1),checkColor(row,col+2),checkColor(row,col+3))){
        console.log('horizontal win');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

function verticalCheck(){
  for(var row=0;row<3;row++){
    for(var col=0;col<7;col++){
      if(colorMatchCheck(checkColor(row,col),checkColor(row+1,col),checkColor(row+2,col),checkColor(row+3,col))){
        console.log('vertical win');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

function diagonalCheck(){
  for(var col=0;col<5;col++){
    for(var row=0;row<7;row++){
      if(colorMatchCheck(checkColor(row,col),checkColor(row+1,col+1),checkColor(row+2,col+2),checkColor(row+3,col+3))){
        console.log('Digonal win');
        reportWin(row,col);
        return true;
      }else if(colorMatchCheck(checkColor(row,col),checkColor(row-1,col+1),checkColor(row-2,col+2),checkColor(row-3,col+3))){
        console.log('Digonal win');
        reportWin(row,col);
        return true;
      }else {
        continue;
      }
    }
  }
}

function gameEnd(winningPlayer) {
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 7; row++) {
      $('h3').fadeOut('fast');
      $('h2').fadeOut('fast');
      $('h1').text(winningPlayer+" has won! Refresh your browser to play again!").css("fontSize", "50px")
    }
  }
}

var currentPlayer=1;
var currentName=player1;
var currnetColor=player1color;

$('h3').text(player1+", it is your turn, pick a column to drop your chip");

$('.board button').on('click',function(){
  var col=$(this).closest('td').index();
  console.log("closest index is:"+col);
  var bottomAvailable=checkBottom(col);
  console.log("bottom="+bottomAvailable);
  changeColor(bottomAvailable,col,currnetColor);
  console.log(changeColor(bottomAvailable,col,currnetColor));
  if(horizontalCheck() || verticalCheck() || diagonalCheck()){
    gameEnd(currentName);
  }

  currentPlayer= currentPlayer* -1;
if(currentPlayer === 1){
  currentName = player1;
  $('h3').text("Your turn now, "+currentName)
  currnetColor=player1color;
}else {
  currentName = player2;
  $('h3').text("Your turn now, "+currentName)
  currnetColor=player2color;
}

})
