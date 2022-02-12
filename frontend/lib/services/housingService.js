import { delay, getConsecutiveId } from '../utils'

const keys = {
    housings: 'housing'
}

const initialHousings = [
    { Id: 1, Name: "Galpao do setor de agronomia" }
]

async function getHousings(user) {
    await delay(100);

    const storedHousings = localStorage.getItem(keys.housings);

    if (!storedHousings)
        localStorage.setItem(keys.housings, JSON.stringify(initialHousings));

    return JSON.parse(localStorage.getItem(keys.housings));
}

async function getById(housingId, user) {
    const housings = await getHousings(user);

    return housings.filter(h=>h.Id===housingId)[0]
}

async function create(name, user) {
    const housings = await getHousings(user);
    const newId = getConsecutiveId(housings);

    const createdHousing = {
        Id: newId,
        Name: name
    }

    localStorage.setItem(keys.housings, JSON.stringify(housings.concat(createdHousing)))

    return createdHousing;
}

const housingService = {
    getHousings,
    create,
    getById,
    keys
}

export default housingService;