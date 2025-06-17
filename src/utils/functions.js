export function encodedError(field, error) {
    return encodeURIComponent(JSON.stringify({
        error: {
            [field]: {
                _errors: [error],
            },
        },
    }));
};

export const getErrorMessage = (error) => {
    if (isAxiosError(error)) {
        return (
            error.response?.data?.message ||
            error.response?.data?.error ||
            `Erro ${error.response?.status}` ||
            'Erro na requisição.'
        );
    }

    if (error instanceof Error) {
        return error.message;
    }

    return 'Erro inesperado.';
};