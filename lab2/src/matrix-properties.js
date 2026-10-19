export function trace(A) {
    if (!isSquare(A)) {
        throw new Error("Matrix must be square");
    }
    return A.reduce((sum, row, i) => sum + row[i], 0);
}

export function isSquare(A) {
    return A.every(row => row.length === A.length);
}

export function isDiagonal(A) {
    if (!isSquare(A)) {
        return false;
    }
    return A.every((row, i) => row.every((value, j) => i === j || value === 0));
}

export function isSymmetric(A) {
    if (!isSquare(A)) {
        return false;
    }
    return A.every((row, i) => row.every((value, j) => value === A[j][i]));
}
