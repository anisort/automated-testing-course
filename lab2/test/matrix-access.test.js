import { expect } from 'chai';
import { getRow, getColumn, getElement, setElement } from '../src/matrix-access.js';

describe('Matrix element access and processing', function () {
    describe('getRow()', function () {
        it('should return the specified row', function () {
            const A = [[1, 2, 3], [4, 5, 6]];

            expect(getRow(A, 1)).to.deep.equal([4, 5, 6]);
        });
    });

    describe('getColumn()', function () {
        it('should return the specified column', function () {
            const A = [[1, 2, 3], [4, 5, 6]];

            expect(getColumn(A, 1)).to.deep.equal([2, 5]);
        });
    });

    describe('getElement()', function () {
        it('should return the element at the specified position', function () {
            const A = [[1, 2, 3], [4, 5, 6]];

            expect(getElement(A, 1, 2)).to.equal(6);
        });
    });

    describe('setElement()', function () {
        it('should return a matrix with the specified element changed', function () {
            const A = [[1, 2], [3, 4]];

            expect(setElement(A, 0, 1, 9)).to.deep.equal([
                [1, 9],
                [3, 4]
            ]);
        });
    });
});