describe("Generation", function() {
    var expectCellToBeAlive = function(aliveCells, actualCell) {
        for (var i=0; i<aliveCells.length; i++) {
            var aliveCell = aliveCells[i];
            if (aliveCell.row === actualCell.row && aliveCell.col === actualCell.col) {
                return true;
            }
        }

        return false;
    };

    it("should create correct initial cells", function() {
        // Given
        var config = { rows: 10, cols: 30, aliveCells: [ { row: 9, col: 11 }] };
        var generation = new Generation(config);

        // When
        var actualCells = generation.getCells();

        // Then
        for (var row=0;row<config.rows;row++) {
            for (var col=0;col<config.cols;col++) {
                var actualCell = actualCells[row][col];
                assert.equal(actualCell.isAlive, expectCellToBeAlive(config.aliveCells, actualCell));
            }
        }
    })
})

describe("Cell", function() {
    var addAliveNeighbours = function(cell, numberOfAliveNeighbours) {
        var aliveNeighbours = [];
        for (var i=0; i<numberOfAliveNeighbours; i++) {
            aliveNeighbours.push(new Cell({ isAlive: true}));
        }
        cell.setNeighbours(aliveNeighbours);
    };

    it("should die if less than 2 neighbours are alive", function() {
        for (var numberOfNeighboursAlive=0; numberOfNeighboursAlive<2;numberOfNeighboursAlive++) {
            // Given
            var cell = new Cell({isAlive: true});
            addAliveNeighbours(cell, numberOfNeighboursAlive);

            // When
            cell.evolve();

            // Then
            assert.equal(cell.isAlive, false);
        }
    });

    it("should survive if 2 or 3 neighbours are alive", function() {
        for (var numberOfNeighboursAlive=2; numberOfNeighboursAlive<=3;numberOfNeighboursAlive++) {
            // Given
            var cell = new Cell({isAlive: true});
            addAliveNeighbours(cell, numberOfNeighboursAlive);

            // When
            cell.evolve();

            // Then
            assert.equal(cell.isAlive, true);
        }
    });

    it("should die if more then 3 neighbours are alive", function() {
        for (var numberOfNeighboursAlive=4; numberOfNeighboursAlive<=8;numberOfNeighboursAlive++) {
            // Given
            var cell = new Cell({isAlive: true});
            addAliveNeighbours(cell, numberOfNeighboursAlive);

            // When
            cell.evolve();

            // Then
            assert.equal(cell.isAlive, false);
        }
    });

    it("should become alive if has 3 alive neighbours", function() {
        // Given
        var cell = new Cell({ isAlive : false });
        addAliveNeighbours(cell, 3);

        // When
        cell.evolve();

        // Then
        assert.equal(cell.isAlive, true);
    });
});