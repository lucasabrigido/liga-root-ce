
class UserClient {
    constructor () {
        this._baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    }
    async userInfo() {
        const res = await fetch(`${this._baseUrl}/api/users`)
        if (!res.ok) throw new Error('Falha ao buscar usuários')
        return res.json()
    }

}

export default new UserClient();
