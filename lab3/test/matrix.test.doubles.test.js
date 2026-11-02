const { expect } = require("chai");
const sinon = require("sinon");
const Matrix = require("../src/matrix");

describe("Spy demonstration", function () {
    it("should track calls to get_cols()", function () {
        const matrix = new Matrix(2);
        const spy = sinon.spy(matrix, "get_cols");

        matrix.mull_add(0, 1, 2);

        expect(spy.called).to.be.true;
        expect(spy.callCount).to.be.greaterThan(0);

        spy.restore();
    });
});

describe("Stub demonstration", function () {
    it("should replace get_cols() with a predefined result", function () {
        const matrix = new Matrix(2);
        const stub = sinon.stub(matrix, "get_cols").returns(3);

        matrix.mull_add(0, 1, 2);

        expect(stub.called).to.be.true;
        expect(matrix.get_cols()).to.equal(3);

        stub.restore();
    });
});

describe("Fake demonstration", function () {
    it("should use a simplified working matrix implementation", function () {
        class FakeMatrix {
            constructor(n) {
                this.data = Array.from(
                    { length: n },
                    () => Array(n + 1).fill(0)
                );
            }

            get(i, j) {
                return this.data[i][j];
            }

            set(i, j, value) {
                this.data[i][j] = value;
            }
        }

        const matrix = new FakeMatrix(2);

        matrix.set(0, 1, 10);

        expect(matrix.get(0, 1)).to.equal(10);
    });
});

describe("Dummy demonstration", function () {
    it("should accept an unused argument", function () {
        function add(a, b, unused) {
            return a + b;
        }

        const dummy = {};

        expect(add(2, 3, dummy)).to.equal(5);
    });
});
