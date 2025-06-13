
class UserClient {
    async userInfo() {
        const res = await fetch('http://localhost:3000/api/users')
        if (!res.ok) throw new Error('Falha ao buscar usuários')
        return res.json()
    }

}

export default new UserClient();
