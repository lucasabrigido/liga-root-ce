import { z } from 'zod'

export async function validateRequest(
    req,
    schema,
    type,
) {
    let data;

    if (type === 'body') {
        const contentType = req.headers.get('content-type') || '';

        if (contentType.includes('application/json')) {
            data = await req.json();
        } else if (contentType.includes('application/x-www-form-urlencoded')) {
            const formData = await req.formData();
            data = Object.fromEntries(formData.entries());
        } else {
            throw new Error(`Unsupported content-type: ${contentType}`);
        }
    } else if (type === 'query') {
        data = Object.fromEntries(req.nextUrl.searchParams.entries());
    } else if (type === 'params') {
        throw new Error('`params` validation is only available via route handlers with context');
    }

    const result = schema.safeParse(data);

    if (!result.success) {
        const formattedErrors = result.error.format();
        console.log('formattedErrors: ', JSON.stringify({error: formattedErrors, data}, null, 2))
        throw new Error(JSON.stringify({error: formattedErrors}, null, 2));
    }

    return result.data;
}
