import { expect } from 'chai';
import { add, subtract, scalarMultiply, multiply } from '../src/arithmetic-operations.js';

describe('Arithmetic operations', function () {
    describe('add()', function () {
        it('should add two matrices of the same dimensions', function () {
            const A = [[1, 2], [3, 4]];
            const B = [[5, 6], [7, 8]];

            expect(add(A, B)).to.deep.equal([
                [6, 8],
                [10, 12]
            ]);
        });
    });

    describe('subtract()', function () {
        it('should subtract the second matrix from the first', function () {
            const A = [[5, 8], [7, 9]];
            const B = [[1, 3], [2, 4]];

            expect(subtract(A, B)).to.deep.equal([
                [4, 5],
                [5, 5]
            ]);
        });
    });

    describe('scalarMultiply()', function () {
        it('should multiply every matrix element by a scalar', function () {
            const A = [[1, -2], [3, 4]];

            expect(scalarMultiply(A, 3)).to.deep.equal([
                [3, -6],
                [9, 12]
            ]);
        });
    });

    describe('multiply()', function () {
        it('should multiply two compatible matrices', function () {
            const A = [[1, 2, 3], [4, 5, 6]];
            const B = [[7, 8], [9, 10], [11, 12]];

            expect(multiply(A, B)).to.deep.equal([
                [58, 64],
                [139, 154]
            ]);
        });
    });
});
