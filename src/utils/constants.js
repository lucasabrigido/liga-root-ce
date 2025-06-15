export default {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    stage: process.env.NEXT_STAGE,
    dynamoEndpoint: process.env.DYNAMO_ENDPOINT,
    region: process.env.REGION,
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretKey: process.env.AWS_SECRET_ACCESS_KEY,
    authConfig: {
        secret: process.env.USER_SECRET,
        expiresIn: parseInt(process.env.USER_EXPIRES),
    },
}

export const ItemsMenu = [
    {
        name: 'Home',
        path: '/home',
        renderBanner: true,
        auth: true,
    },
    {
        name: 'Inscricoes',
        path: '/inscricoes',
        renderBanner: true,
        auth: false,
    },
    {
        name: 'Auditoria',
        path: '/audit',
        renderBanner: true,
        auth: false,
    },
    {
        name: 'Registro',
        path: '/register',
        renderBanner: false,
        auth: false,
    },
    {
        name: 'Login',
        path: '/login',
        renderBanner: false,
        auth: false,
    },
];

export const Scopes = {
    Admin: 'ADMIN',
    User: 'USER',
};

export const UserStatus = {
    Created: 'CREATED',
    Removed: 'REMOVED',
};