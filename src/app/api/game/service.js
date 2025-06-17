import { v4 as uuid } from 'uuid';
import { GameStatus } from '@utils/constants';

import Repository from './repository';
import UserRepository from '@api/users/repository';

class Service {
    /**
     * @typedef {import('../../../utils/constants')} cfg
     * @param {cfg} cfg
     */
    static config(cfg) {
        return new Service(Repository.config(cfg), UserRepository.config(cfg));
    }

    #repository;
    #userRepository;

    async create({ participants, images, ...rest }, tokenId) {
        const now = new Date().toISOString();
        const id = uuid();

        for (const game of participants) {
            await this.#repository.put({
                ...rest,
                id,
                createdAt: now,
                updatedAt: now,
                status: GameStatus.Approved,
                hostId: participants[0].id,
                userId: game.id,
                points: game.points,
                images: game.id === participants[0].id ? images : [],
                faction: game.faction,
                createdId: tokenId,
            });
        }


        return { id };
    }

    async listStats() {
        const users = await this.#userRepository.listAllUsers();
        const games = await this.#repository.listAllGames()

        return {
            users: this.calcNickname(users),
            totalGamesByUser: this.calcTotalGameByUser(games),
            totalPointsByUser: this.calcTotalPointsByUser(games),
            totalGamesByFaction: this.calcTotalGameByFaction(games),
        }
    }

    calcNickname(users) {
        const nicknames = users.reduce((acc, user) => {
            const { id, nickname } = user;
            acc[id] = nickname;
            return acc;
        }, {});

        return nicknames
    }

    calcTotalGameByUser(games) {
        const totalGamesByUser = games.reduce((acc, game) => {
            const { userId } = game;
            acc[userId] = (acc[userId] || 0) + 1;
            return acc;
        }, {});

        return totalGamesByUser
    }

    calcTotalPointsByUser(games) {
        const totalPointsByUser = games.reduce((acc, game) => {
            const { userId, points } = game;
            acc[userId] = (acc[userId] || 0) + points;
            return acc;
        }, {});

        return totalPointsByUser
    }

    calcTotalGameByFaction(games) {
        const totalGamesByFaction = games.reduce((acc, game) => {
            const { faction } = game;
            acc[faction] = (acc[faction] || 0) + 1;
            return acc;
        }, {});

        return totalGamesByFaction;
    }
    /**
     * 
     * @param {Repository} repository 
     * @param {UserRepository} userRepository 
     */
    constructor(repository, userRepository) {
        this.#repository = repository;
        this.#userRepository = userRepository;
    }
}

export default Service;