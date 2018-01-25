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


window.findNRooksSolution = function(n) {
  debugger
  var solution = [];
  var matrix = window.createEmptyMatrix(n);
  
  window.board = new Board(matrix);
  var rows = window.board.attributes;
  
  // iterate over rows
  // place rook in col 0
  for (var key in rows) {
    if (key !== 'n') {
      var row = rows[key];
      window.placeRook(row);
      solution.push(row);
      // check for col confilct
      // if conflict row[0] = 0
    }
  }
    
  // debugger;


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};


window.placeRook = function(row) {
  for (var i = 0; i < row.length; i++) {
    row[i] = 1;
    var conflict = board.hasAnyRooksConflicts();
    if (conflict) {
      row[i] = 0;
    }
  }
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

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
