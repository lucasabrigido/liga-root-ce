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

    async create({ participants, images, ...rest }) {
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
            });
        }


        return {id};
    }

    async listPoints() {
        const users = await this.#userRepository.listAllUsers();
        const games = await this.#repository.listAllGames()

        const result = users.map(user => {
            const totalPoints = games
                .filter(game => game.userId === user.id)
                .reduce((sum, game) => sum + game.points, 0);

            return {
                nickname: user.nickname,
                totalPoints,
            };
        });

        return {
            scores: result,
        }
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