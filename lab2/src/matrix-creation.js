export function transpose(A) {
    if (A.length === 0) {
        return [];
    }
    return A[0].map((_, col) => A.map(row => row[col]));
}

export function identity(n) {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error("Size must be a non-negative integer");
    }
    return Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0));
}

export function zeros(rows, cols) {
    if (!Number.isInteger(rows) || !Number.isInteger(cols) || rows < 0 || cols < 0) {
        throw new Error("Dimensions must be non-negative integers");
    }
    return Array.from({ length: rows }, () => Array(cols).fill(0));
}

export function ones(rows, cols) {
    if (!Number.isInteger(rows) || !Number.isInteger(cols) || rows < 0 || cols < 0) {
        throw new Error("Dimensions must be non-negative integers");
    }
    return Array.from({ length: rows }, () => Array(cols).fill(1));
}
