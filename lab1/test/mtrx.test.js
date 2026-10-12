const { expect } = require('chai');
const Mtrx = require('mtrx');

describe('Mtrx library tests', function () {

    describe('Matrix creation', function () {

        it('should create a matrix filled with zeros', function () {
            const matrix = Mtrx.zeros(2, 2);

            expect(matrix).to.deep.equal([
                [0, 0],
                [0, 0]
            ]);
        });

        it('should create a matrix filled with ones', function () {
            const matrix = Mtrx.ones(2, 3);

            expect(matrix).to.deep.equal([
                [1, 1, 1],
                [1, 1, 1]
            ]);
        });

        it('should create an identity matrix', function () {
            const matrix = Mtrx.eye(3);

            expect(matrix).to.deep.equal([
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ]);
        });

    });

    describe('Arithmetic operations', function () {

        it('should add two matrices', function () {
            const a = new Mtrx([
                [1, 2],
                [3, 4]
            ]);

            const b = new Mtrx([
                [5, 6],
                [7, 8]
            ]);

            const result = Mtrx.add(a, b);

            expect(result).to.deep.equal([
                [6, 8],
                [10, 12]
            ]);
        });

        it('should multiply a matrix by a number', function () {
            const matrix = new Mtrx([
                [1, 2],
                [3, 4]
            ]);

            const result = Mtrx.mul(matrix, 2);

            expect(result).to.deep.equal([
                [2, 4],
                [6, 8]
            ]);
        });

    });

    describe('Matrix transformations', function () {

        it('should transpose a matrix', function () {
            const matrix = new Mtrx([
                [1, 2, 3],
                [4, 5, 6]
            ]);

            const result = matrix.T();

            expect(result).to.deep.equal([
                [1, 4],
                [2, 5],
                [3, 6]
            ]);
        });

    });

    describe('Matrix properties', function () {

        it('should calculate the determinant', function () {
            const matrix = new Mtrx([
                [1, 2],
                [3, 4]
            ]);

            expect(matrix.det).to.equal(-2);
        });

    });

});
