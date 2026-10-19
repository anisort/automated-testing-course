export function getRow(A, index) {
    if (index < 0 || index >= A.length) {
        throw new Error("Row index out of range");
    }
    return [...A[index]];
}

export function getColumn(A, index) {
    if (A.length === 0 || index < 0 || index >= A[0].length) {
        throw new Error("Column index out of range");
    }
    return A.map(row => row[index]);
}

export function getElement(A, row, col) {
    if (row < 0 || row >= A.length || col < 0 || col >= A[row].length) {
        throw new Error("Element index out of range");
    }
    return A[row][col];
}

export function setElement(A, row, col, value) {
    if (row < 0 || row >= A.length || col < 0 || col >= A[row].length) {
        throw new Error("Element index out of range");
    }

    const result = A.map(r => [...r]);
    result[row][col] = value;

    return result;
}
