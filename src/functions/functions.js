export function isObject(variable) {
    return typeof variable === 'object' && variable !== null && !Array.isArray(variable);
}


export function isArray(variable) {
    return Array.isArray(variable);
}