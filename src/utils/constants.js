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
        name: 'Dashboard',
        path: '/dashboard',
        renderBanner: true,
        auth: true,
    },
    {
        name: 'Submeter',
        path: '/game-submission',
        renderBanner: false,
        auth: true,
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
    { value: 'Malandro - O Ladrão', id: 'VAGABOND_THIEF' },
    { value: 'Malandro - O Andarilho', id: 'VAGABOND_TINKER' },
    { value: 'Malandro - O Ronin', id: 'VAGABOND_RONIN' },
    { value: 'Malandro - O Explorador', id: 'VAGABOND_RANGER' },
    { value: 'Malandro - O Arqueólogo', id: 'VAGABOND_ARBITER' },
    { value: 'Malandro - O Exilado', id: 'VAGABOND_VAGRANT' },
    { value: 'Malandro - O Caçador', id: 'VAGABOND_HARRIER' },
    { value: 'Malandro - O Espião', id: 'VAGABOND_AGENT' },
    { value: 'Malandro - O Vigarista', id: 'VAGABOND_SCOUNDREL' },

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

export const ROOT_FACTIONS_MAP = ROOT_FACTIONS.reduce((acc, faction) =>  {
    acc[faction.id] = faction.value;
    return acc;
}, {});