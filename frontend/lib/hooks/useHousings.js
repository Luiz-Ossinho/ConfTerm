import housingService from "../services/housingService";
import useAuthentication from "./useAuthentication";
import useSWR from 'swr'
import { toast } from 'react-toastify';

export default function useHousings() {
    const { currentUser } = useAuthentication();
    const { data: housings, mutate: mutateHousings, error } = useSWR(housingService.keys.housings, async () => housingService.getHousings(currentUser));


    async function create(name) {
        const createdHousingPromise = housingService.create(name, currentUser);

        toast.promise(createdHousingPromise, {
            pending: 'Criando...',
            success: 'Alojamento criado!',
            error: 'Nao foi possivel criar!'
        })

        return createdHousingPromise.then(
            fulfilled => {
                mutateHousings(housings.concat(fulfilled), true)

                return fulfilled;
            },
            rejected => rejected
        );
    }

    return { housings, isLoading: !error && !housings, createNewHousing: create };
}