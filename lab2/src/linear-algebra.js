export function minor(A, row, col) {
    if (!isSquareMatrix(A)) {
        throw new Error("Matrix must be square");
    }

    if (row < 0 || row >= A.length || col < 0 || col >= A.length) {
        throw new Error("Row or column index out of range");
    }

    return A.filter((_, i) => i !== row).map(r => r.filter((_, j) => j !== col));
}

export function determinant(A) {
    if (!isSquareMatrix(A)) {
        throw new Error("Matrix must be square");
    }

    const n = A.length;

    if (n === 0) {
        return 1;
    }

    if (n === 1) {
        return A[0][0];
    }

    if (n === 2) {
        return A[0][0] * A[1][1] - A[0][1] * A[1][0];
    }

    let result = 0;

    for (let col = 0; col < n; col++) {
        result += (col % 2 === 0 ? 1 : -1) * A[0][col] * determinant(minor(A, 0, col));
    }

    return result;
}

export function inverse(A) {
    if (!isSquareMatrix(A)) {
        throw new Error("Matrix must be square");
    }

    const det = determinant(A);

    if (Math.abs(det) < 1e-10) {
        throw new Error("Matrix is singular and has no inverse");
    }

    const n = A.length;
    const cofactors = [];

    for (let i = 0; i < n; i++) {
        const row = [];

        for (let j = 0; j < n; j++) {
            const sign = (i + j) % 2 === 0 ? 1 : -1;
            row.push(sign * determinant(minor(A, i, j)));
        }

        cofactors.push(row);
    }

    const adjugate = cofactors[0].map((_, col) => cofactors.map(row => row[col]));

    return adjugate.map(row =>
        row.map(value => value / det)
    );
}

export function rank(A) {
    if (A.length === 0) {
        return 0;
    }

    const matrix = A.map(row => [...row]);
    const rows = matrix.length;
    const cols = matrix[0].length;
    const epsilon = 1e-10;

    let rank = 0;

    for (let col = 0; col < cols && rank < rows; col++) {
        let pivot = rank;

        for (let i = rank + 1; i < rows; i++) {
            if (Math.abs(matrix[i][col]) > Math.abs(matrix[pivot][col])) {
                pivot = i;
            }
        }

        if (Math.abs(matrix[pivot][col]) < epsilon) {
            continue;
        }

        [matrix[rank], matrix[pivot]] = [matrix[pivot], matrix[rank]];

        const pivotValue = matrix[rank][col];

        for (let j = col; j < cols; j++) {
            matrix[rank][j] /= pivotValue;
        }

        for (let i = 0; i < rows; i++) {
            if (i === rank) {
                continue;
            }

            const factor = matrix[i][col];

            for (let j = col; j < cols; j++) {
                matrix[i][j] -= factor * matrix[rank][j];
            }
        }

        rank++;
    }

    return rank;
}

function isSquareMatrix(A) {
    return A.every(row => row.length === A.length);
}
