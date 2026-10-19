import { expect } from 'chai';
import { trace, isSquare, isDiagonal, isSymmetric } from '../src/matrix-properties.js';

describe('Matrix properties', function () {
    describe('trace()', function () {
        it('should return the sum of the main diagonal elements', function () {
            const A = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

            expect(trace(A)).to.equal(15);
        });
    });

    describe('isSquare()', function () {
        it('should return true for a square matrix', function () {
            expect(isSquare([[1, 2], [3, 4]])).to.equal(true);
        });

        it('should return false for a non-square matrix', function () {
            expect(isSquare([[1, 2, 3], [4, 5, 6]])).to.equal(false);
        });
    });

    describe('isDiagonal()', function () {
        it('should return true when all off-diagonal elements are zero', function () {
            expect(isDiagonal([
                [1, 0, 0],
                [0, 5, 0],
                [0, 0, 9]
            ])).to.equal(true);
        });

        it('should return false when an off-diagonal element is nonzero', function () {
            expect(isDiagonal([
                [1, 2],
                [0, 4]
            ])).to.equal(false);
        });
    });

    describe('isSymmetric()', function () {
        it('should return true for a symmetric matrix', function () {
            expect(isSymmetric([
                [1, 2, 3],
                [2, 4, 5],
                [3, 5, 6]
            ])).to.equal(true);
        });

        it('should return false for a non-symmetric matrix', function () {
            expect(isSymmetric([
                [1, 2],
                [3, 4]
            ])).to.equal(false);
        });
    });
});