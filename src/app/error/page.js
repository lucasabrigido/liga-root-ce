'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get('e');

  const errorMessages = useMemo(() => {
    if (!errorParam) return [];

    try {
      const decoded = decodeURIComponent(errorParam);
      let errorData = JSON.parse(decoded).error;
      // errorData tem estrutura: { _errors: [], firstName: {_errors: [...]}, ... }

      return Object.entries(errorData)
        .filter(([key]) => key !== '_errors')
        .map(([field, val]) => ({
          field,
          messages: val._errors || ['Erro desconhecido'],
        }));
    } catch {
      return [{ field: 'geral', messages: ['Erro ao processar os dados.'] }];
    }
  }, [errorParam]);

  return (
    <div>
      <h1>Erros no cadastro</h1>
      <ul>
        {errorMessages.map(({ field, messages }, idx) => (
          <li key={idx}>
            <strong>{field}:</strong> {messages.join(', ')}
          </li>
        ))}
      </ul>
      <a href="/register">Voltar ao formulário</a>
    </div>
  );
}
