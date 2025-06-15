import * as HttpStatusCodes from 'http-status-codes';

export class HTTPError extends Error {
    constructor(status, error, message, extras) {
        super(message || 'Invalid request');
        this.status = status;
        this.error = error;
        this.message = message;
        this.extras = extras;
    }

    toJSON() {
        return {
            status: this.status,
            error: this.error,
            message: this.message,
            extras: this.extras,
        };
    }
}

export class BadRequestError extends HTTPError {
    constructor(message, {error = 'bad_request', ...rest} = {}) {
        super(HttpStatusCodes.BAD_REQUEST, error, message, rest);
    }
}

export class UnauthorizedError extends HTTPError {
    constructor(message, {error = 'unauthorized', ...rest} = {}) {
        super(HttpStatusCodes.UNAUTHORIZED, error, message, rest);
    }
}
export class PaymentDeniedError extends HTTPError {
    constructor(message, {error = 'payment_denied', ...rest} = {}) {
        super(HttpStatusCodes.PAYMENT_REQUIRED, error, message, rest);
    }
}

export class ForbiddenError extends HTTPError {
    constructor(message, {error = 'forbidden', ...rest} = {}) {
        super(HttpStatusCodes.FORBIDDEN, error, message, rest);
    }
}

export class NotFoundError extends HTTPError {
    constructor(message, {error = 'not_found', ...rest} = {}) {
        super(HttpStatusCodes.NOT_FOUND, error, message, rest);
    }
}

export class ConflictError extends HTTPError {
    constructor(message, {error = 'conflict', ...rest} = {}) {
        super(HttpStatusCodes.CONFLICT, error, message, rest);
    }
}

export class InternalError extends HTTPError {
    constructor(message, {error = 'internal_error', ...rest} = {}) {
        super(HttpStatusCodes.INTERNAL_SERVER_ERROR, error, message, rest);
    }
}

export class NotImplementedError extends HTTPError {
    constructor(message, {error = 'not_implemented', ...rest} = {}) {
        super(HttpStatusCodes.NOT_IMPLEMENTED, error, message, rest);
    }
}

export class LockedError extends HTTPError {
    constructor(message, {error = 'accessed_locked', ...rest} = {}) {
        super(HttpStatusCodes.LOCKED, error, message, rest);
    }
}
