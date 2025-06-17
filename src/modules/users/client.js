
class UserClient {
    constructor() {
        this._baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    }
    async userInfo() {
        const res = await fetch(`${this._baseUrl}/api/users`)
        if (!res.ok) throw new Error('Falha ao buscar usuários')
        return res.json()
    }

    async allUsers() {
        const res = await fetch('/api/users')
        if (!res.ok) throw new Error('Falha ao buscar usuários')
        return res.json()
    }

    async createGame(payload) {
        const res = await fetch('/api/game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || JSON.stringify(data) || 'Erro desconhecido');
        }

        return data;
    }

    async listGames() {
        const res = await fetch(`${this._baseUrl}/api/game`);
        
        if (!res.ok) {
            return {};
        }
        
        const data = await res.json();


        return data;
    }


}

export default new UserClient();
