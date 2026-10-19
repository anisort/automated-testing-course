import { expect } from 'chai';
import { transpose, identity, zeros, ones } from '../src/matrix-creation.js';

describe('Matrix creation and transformations', function () {
    describe('transpose()', function () {
        it('should transpose a matrix', function () {
            const A = [[1, 2, 3], [4, 5, 6]];

            expect(transpose(A)).to.deep.equal([
                [1, 4],
                [2, 5],
                [3, 6]
            ]);
        });
    });

    describe('identity()', function () {
        it('should create an identity matrix of the given size', function () {
            expect(identity(3)).to.deep.equal([
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ]);
        });
    });

    describe('zeros()', function () {
        it('should create a matrix filled with zeros', function () {
            expect(zeros(2, 3)).to.deep.equal([
                [0, 0, 0],
                [0, 0, 0]
            ]);
        });
    });

    describe('ones()', function () {
        it('should create a matrix filled with ones', function () {
            expect(ones(2, 3)).to.deep.equal([
                [1, 1, 1],
                [1, 1, 1]
            ]);
        });
    });
});
