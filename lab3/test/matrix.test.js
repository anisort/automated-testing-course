const { expect } = require("chai");
const Matrix = require("../src/matrix");

describe("Matrix", function () {

    describe("constructor", function () {

        it("should create a matrix filled with zeros", function () {
            const matrix = new Matrix(2);

            expect(matrix.matrix).to.deep.equal([
                [0, 0, 0],
                [0, 0, 0]
            ]);
        });

    });

    describe("get_rows()", function () {

        it("should return the number of rows", function () {
            const matrix = new Matrix(3);

            expect(matrix.get_rows()).to.equal(3);
        });

    });

    describe("get_cols()", function () {

        it("should return the number of columns", function () {
            const matrix = new Matrix(3);

            expect(matrix.get_cols()).to.equal(4);
        });

    });

    describe("get() and set()", function () {

        it("should return the value stored at the specified position", function () {
            const matrix = new Matrix(2);

            matrix.set(0, 1, 5);

            expect(matrix.get(0, 1)).to.equal(5);
        });

    });

});
