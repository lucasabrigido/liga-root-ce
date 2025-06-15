export function encodedError(field, error) {
    return encodeURIComponent(JSON.stringify({
        error: {
            [field] : {
                _errors: [error],
            },
        },
    }));
};