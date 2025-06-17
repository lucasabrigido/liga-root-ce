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
    // {
    //     name: 'Auditoria',
    //     path: '/audit',
    //     renderBanner: true,
    //     auth: false,
    // },
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
    {
        name: 'Submeter game',
        path: '/game-submission',
        renderBanner: false,
        auth: true,
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

export const GameStatus = {
    Pending: 'PENDING',
    Approved: 'APPROVED',
    Removed: 'REMOVED',
}

export const ROOT_FACTIONS = [
    { value: 'Marqueses dos Gatos', id: 'MARQUISE_DE_CAT' },
    { value: 'Dinastias da Águia', id: 'EYRIE_DYNASTIES' },
    { value: 'Aliança da Floresta', id: 'WOODLAND_ALLIANCE' },

    // Vagabundos
    { value: 'Vagabundo - O Ladrão', id: 'VAGABOND_THIEF' },
    { value: 'Vagabundo - O Andarilho', id: 'VAGABOND_TINKER' },
    { value: 'Vagabundo - O Ronin', id: 'VAGABOND_RONIN' },
    { value: 'Vagabundo - O Explorador', id: 'VAGABOND_RANGER' },
    { value: 'Vagabundo - O Arqueólogo', id: 'VAGABOND_ARBITER' },
    { value: 'Vagabundo - O Exilado', id: 'VAGABOND_VAGRANT' },
    { value: 'Vagabundo - O Caçador', id: 'VAGABOND_HARRIER' },
    { value: 'Vagabundo - O Espião', id: 'VAGABOND_AGENT' },
    { value: 'Vagabundo - O Vigarista', id: 'VAGABOND_SCOUNDREL' },

    { value: 'Companhia do Rio', id: 'RIVERFOLK_COMPANY' },
    { value: 'Culto dos Lagartos', id: 'LIZARD_CULT' },
    { value: 'Ducado Subterrâneo', id: 'UNDERGROUND_DUCHY' },
    { value: 'Conspiração Corvídea', id: 'CORVID_CONSPIRACY' },
    { value: 'Guardas de Ferro', id: 'KEEPERS_IN_IRON' },
    { value: 'Senhor dos Cem', id: 'LORD_OF_THE_HUNDREDS' },

    // Extras
    { value: 'Contratados', id: 'HIRELINGS' },
    { value: 'Facção Personalizada', id: 'CUSTOM' },
];
