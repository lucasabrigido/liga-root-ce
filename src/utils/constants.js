import MarquiseToken from '@assets/images/marquis-token.jpg';
import AllianceToken from '@assets/images/alliance-token.png';
import CorvidToken from '@assets/images/corvid-token.png';
import RapinasToken from '@assets/images/rapinas-token.png';

import DuchyToken from '@assets/images/duch-token.png';
import LizardToken from '@assets/images/lizard-token.png';
import GuardianToken from '@assets/images/guardian-token.png';
import LordToken from '@assets/images/lord-token.png';
import RiveToken from '@assets/images/rive-token.png';
import VagabondToken from '@assets/images/vagabond-token.jpg';

import Marquises from '@components/mapa-custom/marquises';
import Corvids from '@components/mapa-custom/corvids';
import Rapinas from '@components/mapa-custom/rapinas';
import Alliance from '@components/mapa-custom/alliance';
import Lizzards from '@components/mapa-custom/lizzard';
import Rives from '@components/mapa-custom/rive';
import Lords from '@components/mapa-custom/lord';
import Guardians from '@components/mapa-custom/guardian';
import Vagabond from '@components/mapa-custom/vagabond';
import Duchys from '@components/mapa-custom/duchy';

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
    { value: 'Marqueses dos Gatos', id: 'MARQUISE_DE_CAT', color: '#fa9115', token: MarquiseToken, component: Marquises},
    { value: 'Dinastias da Águia', id: 'EYRIE_DYNASTIES', color: '#0c8aca', token: RapinasToken, component: Rapinas },
    { value: 'Aliança da Floresta', id: 'WOODLAND_ALLIANCE', color: '#75b7a4', token: AllianceToken, component: Alliance },

    // Vagabundos
    { value: 'Malandro - O Ladrão', id: 'VAGABOND_THIEF', token: VagabondToken, color: '#dddfd3', component: Vagabond },
    { value: 'Malandro - O Andarilho', id: 'VAGABOND_TINKER', token: VagabondToken, color: '#dddfd3', component: Vagabond },
    { value: 'Malandro - O Ronin', id: 'VAGABOND_RONIN', token: VagabondToken, color: '#dddfd3', component: Vagabond },
    { value: 'Malandro - O Explorador', id: 'VAGABOND_RANGER', token: VagabondToken, color: '#dddfd3', component: Vagabond },
    { value: 'Malandro - O Arqueólogo', id: 'VAGABOND_ARBITER', token: VagabondToken, color: '#dddfd3', component: Vagabond },
    { value: 'Malandro - O Exilado', id: 'VAGABOND_VAGRANT', token: VagabondToken, color: '#dddfd3', component: Vagabond },
    { value: 'Malandro - O Caçador', id: 'VAGABOND_HARRIER', token: VagabondToken, color: '#dddfd3', component: Vagabond },
    { value: 'Malandro - O Espião', id: 'VAGABOND_AGENT', token: VagabondToken, color: '#dddfd3', component: Vagabond },
    { value: 'Malandro - O Vigarista', id: 'VAGABOND_SCOUNDREL', token: VagabondToken, color: '#dddfd3', component: Vagabond },

    { value: 'Companhia do Rio', id: 'RIVERFOLK_COMPANY', token: RiveToken, color: '#03c5b4', component: Rives },
    { value: 'Culto dos Lagartos', id: 'LIZARD_CULT', token: LizardToken, color: '#f9ec66', component: Lizzards },
    { value: 'Ducado Subterrâneo', id: 'UNDERGROUND_DUCHY', token: DuchyToken, color: '#ebc0a3', component: Duchys },
    { value: 'Conspiração Corvídea', id: 'CORVID_CONSPIRACY', color: '#3e0199', token: CorvidToken, component:Corvids },
    { value: 'Guardas de Ferro', id: 'KEEPERS_IN_IRON', token: GuardianToken, color: '#afb4b2', component: Guardians },
    { value: 'Senhor dos Cem', id: 'LORD_OF_THE_HUNDREDS', token: LordToken, color: '#d9072f', component: Lords },

    // Extras
    // { value: 'Contratados', id: 'HIRELINGS' },
    // { value: 'Facção Personalizada', id: 'CUSTOM' },
];

export const ROOT_FACTIONS_MAP = ROOT_FACTIONS.reduce((acc, faction) =>  {
    acc[faction.id] = faction.value;
    return acc;
}, {});

export const ROOT_FACTIONS_MAP_TOTAL = ROOT_FACTIONS.reduce((acc, faction) =>  {
    acc[faction.id] = faction;
    return acc;
}, {});