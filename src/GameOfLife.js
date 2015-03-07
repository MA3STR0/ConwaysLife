function Cell(config){
    var neighbours = [];
    var getNumberOfAliveNeighbours = function() {
        var numberOfAliveNeighbours = 0;

        for (var i=0; i<neighbours.length; i++) {
            if (neighbours[i].isAlive) {
                numberOfAliveNeighbours++;
            }
        }

        return numberOfAliveNeighbours;
    };

    this.isAlive = config.isAlive;

    this.setNeighbours = function(neighbourList) {
        neighbours = neighbourList;
    };

    this.evolve = function() {
        var numberOfAliveNeighbours = getNumberOfAliveNeighbours();
        var cellDiesOrStaysDead = numberOfAliveNeighbours < 2 || numberOfAliveNeighbours > 3;
        if (cellDiesOrStaysDead) {
            this.isAlive = false;
        }
        else if (numberOfAliveNeighbours === 3) {
            this.isAlive = true;
        }
    };
}

function Generation(config) {
    var cells = [];

    function generateMap() {
        for (var row=0; row<config.rows; row++) {
            cells[row] = [];
            for (var col=0; col<config.cols; col++) {
                cells[row][col] = new Cell({row: row, col: col, isAlive: false});
            }
        }

        for (var i=0; i<config.aliveCells.length; i++) {
            var aliveCell = config.aliveCells[i];
            cells[aliveCell.row][aliveCell.col].isAlive = true;
        }
    };

    generateMap(config);

    this.getCells = function() {
        return cells;
    }
}