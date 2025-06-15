import { v4 as uuid } from 'uuid';
import { BadRequestError } from '@common/errorsClient';
import AuthClient from '@common/authClient';

import Repository from './repository';
import UserRepository from '../users/repository';
import { encodedError } from '@/utils/functions';

class Service {
    /**
     * @typedef {import('../../../utils/constants')} cfg
     * @param {cfg} cfg
     */
    static config(cfg) {
        return new Service(
            Repository.config(cfg),
            AuthClient.config(cfg),
            UserRepository.config(cfg),
            cfg.authConfig.expiresIn
        );
    }

    #repository;
    #authClient;
    #userRepository;
    #expireIn;

    async auth({email, password}, headers) {
        const now = new Date().toISOString();
        let user = await this.#userRepository.retrieveByEmail(email);
        if (!user) {
            user = await this.#userRepository.retrieveByNickname(email);
        }
        const isAuth = user ? await this.#authClient.comparePasswordToHash(password, user.hash) : false;

        if (!isAuth || !user) {
            throw new BadRequestError(encodedError('password', 'Não é permitido logar!'));
        }

        const token = {
            createdAt: user.createdAt,
            email: user.email,
            name: user.name,
            status: user.status,
            id: user.id,
            scopes: user.scopes,
            nickname: user.nickname,
        };

        const accessToken = this.#authClient.generateToken(token);

        await this.#repository.put({
            id: uuid(),
            accessToken,
            createdAt: now,
            token,
            updatedAt: now,
            userId: user.id,
            headers: headers,
        });

        return {
            id: user.id,
            accessToken,
            expireIn: this.#expireIn,
        };
    }
    /**
     * 
     * @param {Repository} repository 
     * @param {AuthClient} auth 
     * @param {UserRepository} userRepository 
     * @param {Number} expireIn 
     */
    constructor(repository, auth, userRepository, expireIn) {
        this.#repository = repository;
        this.#authClient = auth;
        this.#userRepository = userRepository
        this.#expireIn = expireIn;
    }
}

export default Service;