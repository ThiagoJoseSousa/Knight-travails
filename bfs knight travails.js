const knight= (start,end)=> {
start = convertPoint(start);
end=convertPoint(end);
const board= {};
board[JSON.stringify(start)]={level:0, previous:start}; // acess array text as key, value is 0 because its 0 squares away from itself
const q = [start];
while (!(q[0][0]=== end[0] && q[0][1]===end[1])){ //stop when array obj start=end
    const loc=q.shift();
    const moves=checkMoves(knightMoves(loc)) //moves is the array of possible moves, elem 1 is one move, second is one move from start...
    //Adds the next move onto the end of the queue
    moves.forEach(move => {
q.push(move); //the first possible move becomes the start
//Add the new square to the board position and adds 1 to its count
board [JSON.stringify(move)]= {level:(board[JSON.stringify(loc)].level)+1, currentCoords:move,previous:board[JSON.stringify(loc)].currentCoords || loc}  //and board receives a key named by first possible move values as a string

//console.log([JSON.stringify(loc)])   //loc is the node that the search is based on, and is set to 0 at start. board has all items and level's values
    });
}
// the only way to acess previous values is through knowing Its coordinates, i can append the pointer on the object
return board[JSON.stringify(end)]
}

//Convert square from chess notation to array y,x.
const convertPoint=loc=> {
const col = {
    a:1, b:2,c:3,d:4,e:5,f:6,g:7,h:8
}
const letter = loc.charAt(0)
const num=loc.charAt(1)

return [Number(num),col[letter]]
}

const knightMoves = loc=> {
const moves = [];
moves.push([loc[0] -1, loc[1] -2]) //all moves acessing the y and x elenents of the converted arr
moves.push([loc[0] -1, loc[1] +2])
moves.push([loc[0] +1, loc[1] +2])
moves.push([loc[0] +1, loc[1] -2])
moves.push([loc[0] -2, loc[1] -1])
moves.push([loc[0] -2, loc[1] +1])
moves.push([loc[0] +2, loc[1] +1])
moves.push([loc[0] +2, loc[1] -1])
return moves;
}

// Filters the next move to only be valid on on-board moves
const checkMoves= moves => {
    return moves.filter(move => {
        return move[0]>=1 && move[0]<=8 && move[1]>=1 && move[1]<=8
    })
}

function loopConsoleLog (start,end) {//start and end must be chess notation

let level=knight(start,end).level
while (level!==0) {
 console.log(`move ${level} must be `+ `${convertToChess(knight(start,end).previous)}`); 
 
 end=convertToChess(knight(start,end).previous);
 level=knight(start,end).level  
}
}
const convertToChess=loc=> {
    const col = {
        1:'a', 2:'b',3:'c',4:'d',5:'e',6:'f',7:'g',8:'h'
    }
    const letter = loc[1]
    const num=loc[0]
    return `${col[letter]}${Number(num)}`
    }
loopConsoleLog('a3','a2');
//challenge is to console log every square it passed on shortest path, doing that i go into dfs (or not)