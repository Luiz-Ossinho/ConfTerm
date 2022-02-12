import animalProductionService from "../services/animalProductionService";
import measurementService from "../services/measurementService";
import confortService from '../services/confortService'
import speciesService from "../services/speciesService";
import housingService from "../services/housingService";
import useAuthentication from "./useAuthentication";
import useSWR from 'swr'
import { toast } from 'react-toastify';

export default function useAnimalProductions() {
    const { currentUser } = useAuthentication();

    async function fetcher() {
        const allAnimalProductions = await animalProductionService.getAnimalProductions(currentUser);

        return allAnimalProductions.map(
            animalProduction => {
                return {
                    ...animalProduction,
                    fecthMeasurements: () => measurementService.getRecentMeasurementsForAnimalProduction(animalProduction.Id, currentUser),
                    fetchConfortLevel: () => confortService.getTHIFor(animalProduction.SpeciesId, animalProduction.BirthDay),
                    fetchHousing: () => housingService.getById(animalProduction.HousingId, currentUser),
                    fetchSpecies: () => speciesService.getById(animalProduction.SpeciesId)
                }
            }
        );
    }

    const { data: animalProductions, mutate: mutateAnimalProductions, error } = useSWR(animalProductionService.keys.animalProductions, fetcher);

    async function create(speciesId, housingid, birthDay, equipament) {
        const createAnimalProductionPromise = animalProductionService.create(speciesId, housingid, birthDay, equipament, currentUser);

        toast.promise(createAnimalProductionPromise, {
            pending: 'Criando...',
            success: 'Producao criada!',
            error: 'Nao foi possivel criar!'
        })

        return createAnimalProductionPromise.then(
            fulfilled => {
                const createdAnimalProduction = {
                    ...fulfilled,
                    fecthMeasurements: () => measurementService.getRecentMeasurementsForAnimalProduction(fulfilled.Id, currentUser),
                    fetchConfortLevel: () => confortService.getTHIFor(fulfilled.SpeciesId, fulfilled.BirthDay),
                    fetchHousing: () => housingService.getById(fulfilled.HousingId, currentUser),
                    fetchSpecies: () => speciesService.getById(fulfilled.SpeciesId)
                }

                mutateAnimalProductions(animalProductions.concat(createdAnimalProduction), true)

                return createdAnimalProduction;
            },
            rejected => rejected
        );
    }

    return { animalProductions, isLoading: !error && !animalProductions, create };
}