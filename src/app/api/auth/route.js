import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { validateRequest } from '@common/validator';
import constants from '@utils/constants';
import { SchemaUserLogin } from './models';
import Service from './service';


const service = Service.config(constants);

export async function POST(req) {
    try {
        const data = await validateRequest(req, SchemaUserLogin, 'body');
        const token = await service.auth(data, req.headers);

          await cookies().set('token', token.accessToken, {
            httpOnly: true,
            path: '/',
            maxAge: constants.authConfig.expiresIn,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        });

        return NextResponse.redirect(`${constants.baseUrl}/home?e=${encodeURIComponent(JSON.stringify(encodeURIComponent(token)))}`);

    } catch (error) {
        return NextResponse.redirect(`${constants.baseUrl}/error?e=${encodeURIComponent(error.message)}`);
    }
}