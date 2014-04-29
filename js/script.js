/**
 * Created by milon on 4/28/14.
 */

$(function(){
    var turn = 'cop';
    var message = $('#turning');
    message.text('Now Turn Cop');

    var cop_selected = 0;
    var cop_selection = 'cop';
    var $cop;

    $('.black').on('click', function(){
        //check id a cop is clicked
        if ($(this).hasClass('cop')) {
            $cop = $(this);
            cop_selection = $(this).attr('class').split(' ')[3];
            cop_selected = 1;
            //console.log($cop);
        }

        if(cop_selected && !($(this).hasClass('cop') || $(this).hasClass('robber'))){
            var copPos = copValidMove($cop);

            if((Math.floor($(this).attr('id')/10) == copPos[0].row) &&( ($(this).attr('id')%10 == copPos[0].col) || ($(this).attr('id')%10 == copPos[1].col)) ){
                $cop.removeClass('cop');
                $cop.removeClass(cop_selection);

                $(this).addClass(cop_selection);
                $(this).addClass('cop');

                //robber turn
                $('#turning').text('Now Turn Robber.');

                if(robberValidMove($('.robber'), message)){
                    if(Math.floor($('.robber').attr('id')/10) == 1){
                        alert('Robber Wins.');
                        window.location.reload();
                    }
                }
                else{
                    alert('Cop Win.');
                    window.location.reload();
                }
            }
            else{
                $('#turning').text('Invalid Move. Try Again.');
            }


        }

    });

});

function copValidMove(selector){
    var id = selector.attr('id');
    var returnValue = Array();
    returnValue.push({row: Math.floor(id/10)+1, col: (id%10+1)});
    returnValue.push({row: Math.floor(id/10)+1, col: (id%10-1)});
    return returnValue;
}

function robberValidMove(selector, message){
    var id = selector.attr('id');
    var returnValue = Array();
    returnValue.push({row: Math.floor(id/10)-2, col: (id%10-2)});
    returnValue.push({row: Math.floor(id/10)-2, col: (id%10+2)});
    returnValue.push({row: Math.floor(id/10)-1, col: (id%10-1)});
    returnValue.push({row: Math.floor(id/10)-1, col: (id%10+1)});
    returnValue.push({row: Math.floor(id/10)+1, col: (id%10-1)});
    returnValue.push({row: Math.floor(id/10)+1, col: (id%10+1)});
    returnValue.push({row: Math.floor(id/10)+2, col: (id%10-2)});
    returnValue.push({row: Math.floor(id/10)+2, col: (id%10+2)});


    //console.log(returnValue);

    for(var i=0; i< 8; i++){
        var move = {row: returnValue[i].row, col: returnValue[i].col};
        var currentPos = $('#'+move.row+move.col);
        //console.log(currentPos);
        //console.log(!currentPos.hasClass('cop'));
        //break;

        if(currentPos.hasClass('black') && ! currentPos.hasClass('cop')){
            if(i == 0){
                if(! $('#'+(move.row+1)+(move.col+1)).hasClass('cop')){
                    //console.log(currentPos);
                    selector.removeClass('robber');
                    currentPos.addClass('robber');
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

function closeWindow() {
    if (confirm("Are You Sure, You Want to Exit?")) {
        window.close();
    }
}

function resetGame(){
    if (confirm("Are You Sure, You Want to Reset the Game?")) {
        window.location.reload();
    }
}