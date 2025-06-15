import { v4 as uuid } from 'uuid';
import { BadRequestError } from '@common/errorsClient';
import AuthClient from '@common/authClient';
import { Scopes, UserStatus } from '@utils/constants';

import Repository from './repository';
import { encodedError } from '@/utils/functions';

class Service {
    /**
     * @typedef {import('../../../utils/constants')} cfg
     * @param {cfg} cfg
     */
    static config(cfg) {
        return new Service(Repository.config(cfg), AuthClient.config(cfg));
    }

    #repository;
    #authClient;

    async create(user, isAdmin) {
        const now = new Date().toISOString();
        const {email, nickname, password, password2, ...rest} = user;
        
        if (password !== password2) {
            throw new BadRequestError(encodedError('password2', 'senhas devem ser iguais!'));
        }
        
        const retrieveByEmail = await this.#repository.retrieveByEmail(email);
        if (retrieveByEmail) {
            throw new BadRequestError('usuario não pode ser criado');
        }

        const retrieveByNickName = await this.#repository.retrieveByNickname(nickname);
        if (retrieveByNickName) {
            throw new BadRequestError('usuario não pode ser criado');
        }

        const hash = await this.#authClient.generateHash(password);
        const id = uuid();
        const scopes = [Scopes.User];
        if (isAdmin) {
            scopes.push(Scopes.Admin);
        }

        const newUser = {
            ...rest,
            createdAt: now,
            updatedAt: now,
            email,
            nickname,
            hash,
            id,
            scopes: scopes,
            status: UserStatus.Created,
        };

        await this.#repository.put(newUser);

        return id;
    }

    constructor(repository, auth) {
        this.#repository = repository;
        this.#authClient = auth;
    }
}

export default Service;