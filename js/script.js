/**
 * Created by milon on 4/28/14.
 */

$(function(){		//self invoking function, check if the page is fully loaded, all the function will execute after that
    var turn = 'cop';	//check who will play, robber or cop
    var message = $('#turning');	//for displaying message
    message.text('Now Turn Cop');	

    var cop_selected = 0;	//flag for checking, if a cop is selected or not
    var $cop;	//for storing a clicked cop

    $('.black').on('click', function(){		//if clicked on black grid
        //check id if a cop is clicked
        if ($(this).hasClass('cop')) {
            $cop = $(this);		//store cop's current position 
            cop_selected = 1;	//change the flag, make a cop is selected
        }

		//if cop is selected already and for the second click on black grid, the grid has no robber or cop
        if(cop_selected && !($(this).hasClass('cop') || $(this).hasClass('robber'))){
            var copPos = copValidMove($cop);	//get cop's all possible position

			//check if the desired new position is valid
            if((Math.floor($(this).attr('id')/10) == copPos[0].row) &&( ($(this).attr('id')%10 == copPos[0].col) || ($(this).attr('id')%10 == copPos[1].col)) ){
                $cop.removeClass('cop');	//remove cop from the current position
                $cop.removeClass(cop_selection);

                $(this).addClass(cop_selection); //add cop to the new position
                $(this).addClass('cop');

                //robber turn
                $('#turning').text('Now Turn Robber.');	//display message

                if(robberValidMove($('.robber'), message)){	//attempt to give a move to robber
                    if(Math.floor($('.robber').attr('id')/10) == 1){	//check if robber comes to the first row
                        alert('Robber Wins.'); //then the robber wins
                        window.location.reload();	//reload the window for starting new game
                    }
                }
                else{
                    alert('Cop Win.');	//if robber can't move, then cop win
                    window.location.reload();
                }
            }
            else{
                $('#turning').text('Invalid Move. Try Again.');	//showing error message
            }


        }

    });

});

//each id is a two digit numeric value, in which first number denotes the row and second number denotes the column
function copValidMove(selector){
    var id = selector.attr('id');	//get the current position of cop
    var returnValue = Array();
	//determine all two possible move of cop
    returnValue.push({row: Math.floor(id/10)+1, col: (id%10+1)});
    returnValue.push({row: Math.floor(id/10)+1, col: (id%10-1)});
    return returnValue;	//return the move
}

function robberValidMove(selector, message){
    var id = selector.attr('id');	//get robber's current position
    var returnValue = Array();
	//determine all 8 possible move of robber
    returnValue.push({row: Math.floor(id/10)-2, col: (id%10-2)});
    returnValue.push({row: Math.floor(id/10)-2, col: (id%10+2)});
    returnValue.push({row: Math.floor(id/10)-1, col: (id%10-1)});
    returnValue.push({row: Math.floor(id/10)-1, col: (id%10+1)});
    returnValue.push({row: Math.floor(id/10)+1, col: (id%10-1)});
    returnValue.push({row: Math.floor(id/10)+1, col: (id%10+1)});
    returnValue.push({row: Math.floor(id/10)+2, col: (id%10-2)});
    returnValue.push({row: Math.floor(id/10)+2, col: (id%10+2)});

	//trying to move to all the position one after another
    for(var i=0; i< 8; i++){
        var move = {row: returnValue[i].row, col: returnValue[i].col};
        var currentPos = $('#'+move.row+move.col);
        
		//check if the move is possible
        if(currentPos.hasClass('black') && ! currentPos.hasClass('cop')){
            if(i == 0){
                if(! $('#'+(move.row+1)+(move.col+1)).hasClass('cop')){
                    //console.log(currentPos);
                    selector.removeClass('robber');	//remove old position
                    currentPos.addClass('robber');	//move to new position
                    message.text('Now Turn Cop');
                    //console.log(move);
                    return true;
                    break;
                }
            }
            else if(i == 1){
                if(! $('#'+(move.row+1)+(move.col-1)).hasClass('cop')){
                    //console.log(currentPos);
                    selector.removeClass('robber');
                    currentPos.addClass('robber');
                    message.text('Now Turn Cop');
                    //console.log(move);
                    return true;
                    break;
                }
            }
            else if(i == 6){
                if(! $('#'+(move.row-1)+(move.col+1)).hasClass('cop')){
                    //console.log(currentPos);
                    selector.removeClass('robber');
                    currentPos.addClass('robber');
                    message.text('Now Turn Cop');
                    //console.log(move);
                    return true;
                    break;
                }
            }
            else if(i == 7){
                if(! $('#'+(move.row-1)+(move.col-1)).hasClass('cop')){
                    //console.log(currentPos);
                    selector.removeClass('robber');
                    currentPos.addClass('robber');
                    message.text('Now Turn Cop');
                    //console.log(move);
                    return true;
                    break;
                }
            }
            else{
                //console.log(currentPos);
                selector.removeClass('robber');
                currentPos.addClass('robber');
                message.text('Now Turn Cop');
                //console.log(move);
                return true;
                break;
            }
        }
    }
    return false;
}

//show confirmation message for restart the game
function resetGame(){
    if (confirm("Are You Sure, You Want to Reset the Game?")) {
        window.location.reload();
    }
}