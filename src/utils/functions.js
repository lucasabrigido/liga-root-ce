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

export function encodedObj(obj) {
    return encodeURIComponent(JSON.stringify(obj));
};

export function drawNumbers() {
  const numbers = new Set();

  while (numbers.size < 6) {
    const number = Math.floor(Math.random() * 12); // 0 to 11
    numbers.add(number);
  }

  return Array.from(numbers);
}