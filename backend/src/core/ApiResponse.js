export function ok(data, message = "OK") {
    return { success: true, message, data };
}

export function fail(message = "Error") {
    return { success: false, message };
}
