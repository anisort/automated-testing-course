import { expect } from 'chai';
import { determinant, inverse, minor, rank } from '../src/linear-algebra.js';

describe('Linear algebra', function () {
    describe('determinant()', function () {
        it('should calculate the determinant of a 2x2 matrix', function () {
            const A = [[1, 2], [3, 4]];

            expect(determinant(A)).to.equal(-2);
        });
    });

    describe('inverse()', function () {
        it('should calculate the inverse of an invertible matrix', function () {
            const A = [[1, 2], [3, 4]];

            expect(inverse(A)).to.deep.equal([
                [-2, 1],
                [1.5, -0.5]
            ]);
        });
    });

    describe('minor()', function () {
        it('should return the minor matrix after removing a row and a column', function () {
            const A = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ];

            expect(minor(A, 0, 1)).to.deep.equal([
                [4, 6],
                [7, 9]
            ]);
        });
    });

    describe('rank()', function () {
        it('should return the rank of a matrix', function () {
            const A = [
                [1, 2, 3],
                [2, 4, 6],
                [1, 1, 1]
            ];

            expect(rank(A)).to.equal(2);
        });
    });
});