
const sinon = require("sinon");
const Matrix = require("../src/matrix");

describe("Matrix mock tests", function () {

    it("mull_add() should call get_cols()", function () {
        const matrix = new Matrix(2);
        const mock = sinon.mock(matrix);

        mock.expects("get_cols").atLeast(1).returns(3);

        try {
            matrix.mull_add(0, 1, 2);

            mock.verify();
        } finally {
            mock.restore();
        }
    });

    it("exists_wrong_row() should call get_rows()", function () {
        const matrix = new Matrix(2);
        const mock = sinon.mock(matrix);

        mock.expects("get_rows").atLeast(1).returns(2);

        try {
            matrix.exists_wrong_row();

            mock.verify();
        } finally {
            mock.restore();
        }
    });

    it("exists_zero_row() should call get_rows() and get_cols()", function () {
        const matrix = new Matrix(2);
        const mock = sinon.mock(matrix);

        mock.expects("get_rows").atLeast(1).returns(2);
        mock.expects("get_cols").atLeast(1).returns(3);

        try {
            matrix.exists_zero_row();

            mock.verify();
        } finally {
            mock.restore();
        }
    });

    it("swap_with_nonzero_row() should call get_rows() and get_cols()", function () {
        const matrix = new Matrix(2);

        // Make the first element of the second row nonzero
        matrix.set(1, 0, 5);

        const mock = sinon.mock(matrix);

        mock.expects("get_rows").atLeast(1).returns(2);
        mock.expects("get_cols").atLeast(1).returns(3);

        try {
            matrix.swap_with_nonzero_row(0);

            mock.verify();
        } finally {
            mock.restore();
        }
    });

});
