import { delay, getConsecutiveId } from '../utils'
import { DateTime } from 'luxon'

const keys = {
    animalProductions: 'animal_productions'
}

const initialAnimalProductions = [
    {
        Id: 1,
        SpeciesId: 1,
        HousingId: 1,
        BirthDay: DateTime.now().minus({ hours: 336 }).valueOf(),
        Equipament: 'Equipamento 1'
    }
]

async function getAnimalProductions(user) {
    await delay(100);

    const storedHousings = localStorage.getItem(keys.animalProductions);

    if (!storedHousings)
        localStorage.setItem(keys.animalProductions, JSON.stringify(initialAnimalProductions));

    return JSON.parse(localStorage.getItem(keys.animalProductions));
}

async function create(speciesId, housingid, birthDay, equipament, user) {
    const animalProductions = await getAnimalProductions(user);
    const newId = getConsecutiveId(animalProductions);

    const createdAnimalProduction = {
        Id: newId,
        SpeciesId: speciesId,
        HousingId: housingid,
        BirthDay: birthDay,
        Equipament: equipament
    }

    localStorage.setItem(keys.animalProductions, JSON.stringify(animalProductions.concat(createdAnimalProduction)))

    return createdAnimalProduction;
}

const animalProductionService = {
    getAnimalProductions,
    create,
    keys
}

export default animalProductionService;