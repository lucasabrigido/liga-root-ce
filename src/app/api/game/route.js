import {parse} from 'cookie';
import { NextResponse } from 'next/server';
import { validateRequest } from '@common/validator';
import { SchemaGameSubmission } from './models';
import constants from '@utils/constants';
import Service from './service';
import AuthClient from '@common/authClient';


const service = Service.config(constants);
const auth = AuthClient.config(constants);

export async function POST(req) {
    try {
        const data = await validateRequest(req, SchemaGameSubmission, 'body');
        const cookies = req.headers.get('cookie');
        const parsedCookies = parse(cookies || '');
        const token = parsedCookies.token;
        const payload = await auth.validateToken(token);

        return NextResponse.json(await service.create(data, payload.id));
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        return NextResponse.json(await service.listStats());
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
