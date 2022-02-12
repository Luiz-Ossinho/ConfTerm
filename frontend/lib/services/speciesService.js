import { delay, getConsecutiveId } from '../utils'

const keys = {
    species: "species"
}

const initialSpecies = [
    { Id: 1, Name: "Vaca" },
    { Id: 2, Name: "Coelho" },
    { Id: 3, Name: "Porco" }
]

async function getSpeciesById(speciesId) {
    const allSpecies = await getSpecies();

    return allSpecies.filter(s => s.Id === speciesId)[0];
}

async function getSpecies() {
    await delay(100);

    const storedSpecies = localStorage.getItem(keys.species);

    if (!storedSpecies)
        localStorage.setItem(keys.species, JSON.stringify(initialSpecies));

    return JSON.parse(localStorage.getItem(keys.species));
}

async function getById(speciesId) {
    const species = await getSpecies();

    return species.filter(s => s.Id === speciesId)[0]
}

async function create(name, user) {
    const species = await getSpecies();
    const newId = getConsecutiveId(species);

    const createdSpecies = {
        Id: newId,
        Name: name
    }

    localStorage.setItem(keys.species, JSON.stringify(species.concat(createdSpecies)))

    return createdSpecies;
}

const speciesService = {
    getSpecies,
    create,
    getById,
    getSpeciesById,
    keys
}

export default speciesService;