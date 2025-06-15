import { NextResponse } from 'next/server';
import { validateRequest } from '@common/validator';
import { UserSchema } from './models';
import constants from '@utils/constants';
import Service from './service';


const service = Service.config(constants);

export async function POST(req) {
    try {
        const data = await validateRequest(req, UserSchema, 'body');
        await service.create(data, false)

        return NextResponse.redirect(`${constants.baseUrl}/login`, 303);

    } catch (error) {
        return NextResponse.redirect(`${constants.baseUrl}/error?e=${encodeURIComponent(error.message)}`);
    }
}