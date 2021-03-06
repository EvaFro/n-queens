// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },
    // Listen to toby
    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var obj = {};
      var row = this.attributes[rowIndex];
      var flag = false;
      row.forEach(function(item) {
        if (item !== 0 && obj.hasOwnProperty(item)) {
          flag = true;
        } else {
          obj[item] = item;
        }
      });
      return flag;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var attributes = this.attributes;
      for (var key in attributes) {
        if (key !== 'n') {
          var conflict = this.hasRowConflictAt(key);
          if (conflict) {
            return true;
          }
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //return false; // fixme
      //for each element in attributes
      // key is the index of a column
      // attributes[key][0] key = 0
      // first item in a column
      // second item in the first column
      // attributes[key][0] key = 1
      var obj = {};

      var attributes = this.attributes;
      for (var key in attributes) {
        if (key !== 'n') {     
          var item = attributes[key][colIndex];
          if (item !== 0 && obj.hasOwnProperty(item)) {
            return true;
          } else {
            obj[item] = item;
          }
        }
      }
      //debugger;
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //create column array from matrix
      //for each column in this.attributes
      //check if there is more than one occurrence
      //of 1
      //if true
      //return true
      //else
      //return false

      var attributes = this.attributes;
      for (var key in attributes) {
        if (key !== 'n') {
          var conflict = this.hasColConflictAt(key);
          if (conflict) {
            return true;
          }
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var colIndex = majorDiagonalColumnIndexAtFirstRow;
      var rowIndex = 0;
      // simple a for loop before the while loop
      // using the row index = i in the for loop
      var attributes = this.attributes;
      //debugger;
      var obj = {};
      while (colIndex < attributes.n) {
        var item = attributes[rowIndex][colIndex];
        if (item !== 0 && obj.hasOwnProperty(item)) {
          return true;
        } else {
          obj[item] = item;
        }
        colIndex++;
        rowIndex++;
      }

      rowIndex = majorDiagonalColumnIndexAtFirstRow;
      colIndex = 0;
     
      var obj = {};
      while (rowIndex < attributes.n) {
        var item = attributes[rowIndex][colIndex];
        if (item !== 0 && obj.hasOwnProperty(item)) {
          return true;
        } else {
          obj[item] = item;
        }
        colIndex++;
        rowIndex++;
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // Listen to toby
      // _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      //   return colIndex - rowIndex;
      // },
      var n = this.attributes.n;
      var conflict = false;
      for (var i = 0; i < n - 1; i++) {
        conflict = this.hasMajorDiagonalConflictAt(i);
        if (conflict) {
          return true;
        }
      }
      return conflict;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var attributes = this.attributes;
      var colIndex = minorDiagonalColumnIndexAtFirstRow;
      var rowIndex = 0;
      // simple a for loop before the while loop
      // using the row index = i in the for loop
      
      //debugger;
      var obj = {};
      while (colIndex >= 0) {
        var item = attributes[rowIndex][colIndex];
        if (item !== 0 && obj.hasOwnProperty(item)) {
          return true;
        } else {
          obj[item] = item;
        }
        colIndex--;
        rowIndex++;
      }

      rowIndex = attributes.n - 1;
      colIndex = minorDiagonalColumnIndexAtFirstRow - 1;
      var obj = {};
      while (rowIndex > 0) {
        var item = attributes[rowIndex][colIndex];
        if (item !== 0 && obj.hasOwnProperty(item)) {
          return true;
        } else {
          obj[item] = item;
        }
        colIndex++;
        rowIndex--;
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var n = this.attributes.n;
      var conflict = false;
      for (var i = (n - 1); i >= 0; i--) {
        conflict = this.hasMinorDiagonalConflictAt(i);
        if (conflict) {
          return true;
        }
      }
      return conflict;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
