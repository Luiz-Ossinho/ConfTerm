import confortService from "../services/confortService";
import speciesService from "../services/speciesService";
import useAuthentication from "./useAuthentication";
import { toast } from 'react-toastify';

export default function useConforts() {
    const { currentUser } = useAuthentication();

    async function fetchSpeciesWithConforts(speciesId) {
        const specificSpeciesPromise = speciesService.getSpeciesById(speciesId);

        const confortGroupsPromise = confortService.getAllGroupsFor(speciesId);

        await Promise.all([specificSpeciesPromise, confortGroupsPromise]);

        const confortGroups = await confortGroupsPromise;
        const specificSpecies = await specificSpeciesPromise;

        return { ...specificSpecies, ...confortGroups };
    }

    async function updateConfortGroup(confortGroupId, confortType, newMinimalAge, newMaximumAge) {
        const updatePromise = confortService.updateConfortGroup(confortGroupId, confortType, newMinimalAge, newMaximumAge, currentUser);

        toast.promise(updatePromise, {
            pending: 'Editando...',
            success: 'Editado!',
            error: 'Nao foi possivel editar!'
        })

        return await updatePromise;
    }

    async function updateConfortLevel(confortLevelId, confortType, confortProps) {
        const updatePromise = confortService.updateConfortLevel(confortLevelId, confortType, confortProps, currentUser);

        toast.promise(updatePromise, {
            pending: 'Editando...',
            success: 'Editado!',
            error: 'Nao foi possivel editar!'
        })

        return await updatePromise;
    }

    async function insertConfortGroup(minimalAge, maximumAge, speciesId, confortType) {
        const insertPromise = confortService.createConfortGroup(minimalAge, maximumAge, speciesId, confortType, currentUser);

        toast.promise(insertPromise, {
            pending: 'Criando...',
            success: 'Faixa etária criada!',
            error: 'Nao foi possivel criar!'
        })

        return await insertPromise;
    }

    async function insertConfortLevel(confortGroupId, confortLevelProps, confortLevel, confortType) {
        const insertPromise = confortService.createConfortLevel(confortGroupId, confortLevelProps, confortLevel, confortType, currentUser);

        toast.promise(insertPromise, {
            pending: 'Criando...',
            success: 'Nivel de conforto criado!',
            error: 'Nao foi possivel criar!'
        })

        return await insertPromise;
    }

    return { fetchSpeciesWithConforts, updateConfortGroup, updateConfortLevel, insertConfortGroup, insertConfortLevel };
}