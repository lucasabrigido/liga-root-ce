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

        return NextResponse.redirect(`${constants.baseUrl}/success`, 303);

    } catch (error) {
        return NextResponse.redirect(`${constants.baseUrl}/error?e=${encodeURIComponent(error.message)}`, 303);
    }
}

export async function GET() {
    try {
        return NextResponse.json(await service.listAllUsers());
    } catch (error) {
        return NextResponse.redirect(`${constants.baseUrl}/error?e=${encodeURIComponent(error.message)}`, 303);
    }
}