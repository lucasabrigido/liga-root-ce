/* eslint-disable @typescript-eslint/ban-ts-comment */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { promisify } from 'util';


export default class AuthClient {
    #authConfig;
    static config(cfg) {
        return new AuthClient(
            cfg.authConfig,
        );
    }

    generateHash = async(password) => {
        return await bcrypt.hash(password, 8);
    };

    generateToken(obj) {
        return jwt.sign(obj, this.#authConfig.secret, {
            expiresIn: this.#authConfig.expiresIn,
        });
    }

    comparePasswordToHash = async(password, hash) => {
        return await bcrypt.compare(password, hash);
    };

    validateToken = async(token) => {
        try {
            const cToken = await promisify(jwt.verify)(token, this.#authConfig.secret);
            return {valid: true, ...cToken};
        } catch (err) {
            return {valid: false};
        }
    };

    constructor(
        authConfig,
    ) {
        this.#authConfig = authConfig;
    }
}