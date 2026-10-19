export function add(A, B) {
    if (A.length !== B.length || A.some((row, i) => row.length !== B[i].length)) {
        throw new Error("Matrices must have the same dimensions");
    }
    return A.map((row, i) => row.map((value, j) => value + B[i][j]));
}

export function subtract(A, B) {
    if (A.length !== B.length || A.some((row, i) => row.length !== B[i].length)) {
        throw new Error("Matrices must have the same dimensions");
    }
    return A.map((row, i) => row.map((value, j) => value - B[i][j]));
}

export function scalarMultiply(A, k) {
    return A.map(row => row.map(value => value * k));
}

export function multiply(A, B) {
    if (A.length === 0 || B.length === 0) {
        throw new Error("Matrices must not be empty");
    }

    if (A[0].length !== B.length) {
        throw new Error("Incompatible matrix dimensions");
    }

    const result = [];

    for (let i = 0; i < A.length; i++) {
        const row = [];

        for (let j = 0; j < B[0].length; j++) {
            let sum = 0;

            for (let k = 0; k < B.length; k++) {
                sum += A[i][k] * B[k][j];
            }

            row.push(sum);
        }

        result.push(row);
    }

    return result;
}
