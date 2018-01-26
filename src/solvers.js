/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.createEmptyMatrix = function(n) {
  var matrix = [];
  
  //add n rows of n elements to matrix

  //iterate over number of rows ---> n
  //create temp new array instance
  // var tempRow = [];
  //iterate over number of columns ---> n
  // tempRow.push(0);
  //add tempRow to matrix

  for (var i = 0; i < n; i++) {
    var tempRow = [];  
    for (var j = 0; j < n; j++) {
      tempRow.push(0);
    }
    matrix.push(tempRow);
  }
  return matrix;
};


// window.findNRooksSolution = function(n, start = 0) {
//   var solution = [];
//   var matrix = window.createEmptyMatrix(n);
  
//   window.board = new Board(matrix);
//   var rows = window.board.attributes;
//   debugger;
//   // iterate over rows
//   // place rook in col 0
//   // 
//   for (var key in rows) {
//     if (key !== 'n') {
//       var row = rows[key];
//       window.placeRook(row, start);
//       start = 0;
//       solution.push(row);
//     }
//   }
//   console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
//   return solution;
// };


window.findNRooksSolution = function(n) {
  var matrix = window.createEmptyMatrix(n); 
  window.board = new Board(matrix);
  var solution;  
  debugger;
  var rows = window.board.rows();
  var innerFunction = function(rowNum, rows) {
    if (rowNum === rows.length) {
      console.log(JSON.stringify(rows));
      solution = rows;
      matrix = window.createEmptyMatrix(n);
      window.board = new Board(matrix);
      rows = window.board.rows();
      return;
    }

    for (var i = 0; i < rows.length; i++) {
      window.placeRook(rows[rowNum], i);
      innerFunction(rowNum + 1, rows);
      rows[rowNum][rows[rowNum].indexOf(1)] = 0;
      debugger;
      //turn off rowNum, i colNum
    }
  };
  debugger;
  innerFunction(0, rows);
  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

window.placeRook = function(row, start) {
  for (var i = start; i < row.length; i++) {
    row[i] = 1;
    var conflict = board.hasAnyRooksConflicts();
    if (conflict) {
      row[i] = 0;
    }
  }
};

window.countPieces = function() {
  var solutionBoard = window.board;
  var numPieces = _.reduce(solutionBoard.rows(), function(memo, row) {
    return memo + _.reduce(row, function(memo, col) {
      return memo + col;
    }, 0);
  }, 0);
  return numPieces;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  
  //
  // Another loop increases row index


  for (var i = 0; i < n; i++) {
    //change starting row too place this iteration inside another loop
    //that changes row start too working down
    window.findNRooksSolution(n, i);
    var numPieces = window.countPieces();
    if (numPieces === n) {
      solutionCount++;
    }
  }
  if (n > 2) {

    // Another loop deacreasing row index
  
    for (var i = n - 1; i >= 0; i--) {
      //change starting row too place this iteration inside another loop
      //that changes row start too working up
      window.findNRooksSolution(n, i);
      var numPieces = window.countPieces();
      if (numPieces === n) {
        solutionCount++;
      }
    }
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
