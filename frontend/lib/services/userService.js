import { delay } from '../utils'

const keys = {
    users: "users",
    currentUser: "current_user"
}

const initialUsers = [
    { Name: "Admin", IsAdmin: true, Token: "TokenAdmin123", Email: "admin@email.dominio", Password: "senha123" },
    { Name: "Usuario", IsAdmin: false, Token: "TokenUsuario123", Email: "usuario@email.dominio", Password: "senha123" }
]

async function getUsers() {
    await delay(100);

    let storedUsers = localStorage.getItem(keys.users);

    if (!storedUsers)
        localStorage.setItem(keys.users, JSON.stringify(initialUsers));

    return JSON.parse(localStorage.getItem(keys.users));
}

async function login(email, password) {
    console.log("Logando, camada: userService")
    await delay(5000);

    return getCurrentUser().then(currentUser => {
        throw Error(currentUser)
    }, async noCurrentUser => {
        const users = await getUsers();

        const correctUser = users.filter(user => user.Email === email && user.Password === password)[0];

        if (!correctUser) throw Error(correctUser);

        localStorage.setItem(keys.currentUser, JSON.stringify(correctUser));

        console.log("Logado, camada: userService")
        return correctUser;
    });
}

async function logout() {
    await delay(5000);

    console.log("Deslogando, camada: userService")

    localStorage.removeItem(keys.currentUser)

    console.log("Deslogado, camada: userService")

    return;
}

async function getCurrentUser() {
    await delay(100);

    const currentUserStorage = localStorage.getItem(keys.currentUser);

    if (!currentUserStorage) throw Error(currentUserStorage);

    return JSON.parse(localStorage.getItem(keys.currentUser));
}

const userService = {
    getCurrentUser,
    login,
    logout,
    keys
}

export default userService;