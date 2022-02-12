import userService from '../services/userService';
import useSWR from 'swr';
import { toast } from 'react-toastify';

export default function useAuthentication() {
    const { data: currentUser, mutate: mutateCurrentUser, error } = useSWR(userService.keys.currentUser, userService.getCurrentUser);

    async function logout() {
        console.log("Deslogando, camada: useAuthentication")

        const logoutPromise = userService.logout();

        toast.promise(logoutPromise, {
            pending: 'Saindo...',
            success: 'Volte sempre!'
        })

        return logoutPromise.then(
            fulfilled => {
                mutateCurrentUser(null, true);

                console.log("Deslogado, camada: useAuthentication")

                return fulfilled;
            },
            rejected => {
                return rejected;
            }
        )
    }

    async function login(formEmail, formPassword) {

        console.log("Logando, camada: useAuthentication")

        const loginPromise = userService.login(formEmail, formPassword);

        toast.promise(loginPromise, {
            pending: 'Entrando...',
            success: 'Bem vindo!',
            error: 'Nao foi possivel entrar'
        })

        return loginPromise.then(
            fulfilled => {
                mutateCurrentUser(fulfilled, true);

                console.log("Logado, camada: useAuthentication")

                return fulfilled;
            },
            rejected => {
                return rejected;
            }
        )
    }

    return {
        currentUser, isLoading: !error && !currentUser, isAuthenticated: (!(error != null || error != undefined) && (currentUser != null || currentUser != undefined)), login, logout
    }
}