import useAuthentication from './useAuthentication'
import speciesService from '../services/speciesService'
import useSWR from 'swr';
import { toast } from 'react-toastify';


export default function useSpecies() {
    const { currentUser } = useAuthentication();
    const { data: species, mutate: mutateSpecies, error } = useSWR(speciesService.keys.species, async () => await speciesService.getSpecies(currentUser));

    async function create(name) {
        const createdSpeciesPromise = speciesService.create(name, currentUser);

        toast.promise(createdSpeciesPromise, {
            pending: 'Criando...',
            success: 'Especie criada!',
            error: 'Nao foi possivel criar!'
        })

        return createdSpeciesPromise.then(
            fulfilled => {
                mutateSpecies(species.concat(fulfilled), true)

                return fulfilled;
            },
            rejected => rejected
        );
    }

    return { species, isLoading: !error && !species, createNewSpecies: create };
};