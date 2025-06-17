'use client';

import React, { useState } from 'react';

export default function MultiImageUploader({ onFileChange }) {
    const [uploads, setUploads] = useState([]);

    const handleFileChange = async (event) => {
        const files = Array.from(event.target.files);
        if (!files.length) return;

        const newUploads = files.map((file, index) => ({
            id: `${Date.now()}-${index}`,
            preview: URL.createObjectURL(file),
            status: 'loading',
            url: null,
        }));

        // Atualiza o estado com os novos uploads
        setUploads((prevUploads) => [...prevUploads, ...newUploads]);

        const uploadedUrls = [];

        await Promise.all(
            files.map(async (file, index) => {
                const id = newUploads[index].id;
                try {
                    const res = await fetch('https://zbyk5ca5qj.execute-api.us-east-1.amazonaws.com/dev/files/upload', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: 'root/root',
                            mime: file.type,
                            isPrivate: false,
                        }),
                    });

                    const { get, put } = await res.json();


                    await fetch(put, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': file.type,
                        },
                        body: file,
                    });

                    setUploads((prevUploads) =>
                        prevUploads.map((item) =>
                            item.id === id ? { ...item, status: 'done', url: get } : item
                        )
                    );

                    uploadedUrls.push(get);
                } catch (error) {
                    console.error('Erro no upload da imagem:', error);
                    setUploads((prevUploads) =>
                        prevUploads.map((item) =>
                            item.id === id ? { ...item, status: 'error' } : item
                        )
                    );
                }
            })
        );

        if (uploadedUrls.length) {
            onFileChange?.(uploadedUrls);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input type="file" accept="image/*" multiple onChange={handleFileChange} />

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {uploads.map(({ id, preview, status, url }) => (
                    <div key={id} style={{ position: 'relative' }}>
                        <img
                            src={url || preview}
                            alt="Preview"
                            style={{
                                width: '120px',
                                height: '120px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                                opacity: status === 'done' ? 1 : 0.5,
                            }}
                        />
                        {status === 'loading' && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                    borderRadius: '8px',
                                    fontSize: '0.8rem',
                                    fontWeight: 'bold',
                                }}
                            >
                                Enviando...
                            </div>
                        )}
                        {status === 'error' && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'rgba(255, 0, 0, 0.6)',
                                    color: 'white',
                                    borderRadius: '8px',
                                    fontSize: '0.8rem',
                                    fontWeight: 'bold',
                                }}
                            >
                                Erro
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
