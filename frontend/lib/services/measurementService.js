import { delay, getConsecutiveId } from '../utils'
import { DateTime } from 'luxon'

const keys = {
    measurements: 'measurements'
}

const initialMeasurements = [
    {
        Id: 1,
        AnimalProductionId: 1,
        Date: DateTime.now().minus({ minutes: 1 }),
        THI: 90
    },
    {
        Id: 2,
        AnimalProductionId: 1,
        Date: DateTime.now().minus({ minutes: 2 }),
        THI: 15
    },
    {
        Id: 3,
        AnimalProductionId: 1,
        Date: DateTime.now().minus({ minutes: 3 }),
        THI: 50
    },
    {
        Id: 4,
        AnimalProductionId: 1,
        Date: DateTime.now().minus({ minutes: 4 }),
        THI: 20
    },
    {
        Id: 5,
        AnimalProductionId: 1,
        Date: DateTime.now().minus({ minutes: 5 }),
        THI: 50
    },
    {
        Id: 6,
        AnimalProductionId: 2,
        Date: DateTime.now().minus({ minutes: 1 }),
        THI: 90
    },
    {
        Id: 7,
        AnimalProductionId: 2,
        Date: DateTime.now().minus({ minutes: 2 }),
        THI: 70
    },
    {
        Id: 8,
        AnimalProductionId: 2,
        Date: DateTime.now().minus({ minutes: 3 }),
        THI: 87
    },
    {
        Id: 9,
        AnimalProductionId: 2,
        Date: DateTime.now().minus({ minutes: 4 }),
        THI: 60
    },
    {
        Id: 10,
        AnimalProductionId: 2,
        Date: DateTime.now().minus({ minutes: 5 }),
        THI: 100
    },
    {
        Id: 11,
        AnimalProductionId: 2,
        Date: DateTime.now().minus({ minutes: 25 }),
        THI: 100
    }
]

/* 
    @function getRecentMeasurementsForAnimalProduction
    Retorna as medicoes dos ultimos 30 minutos para um determinado id.
*/
async function getRecentMeasurementsForAnimalProduction(animalProductionId, user) {
    const nowStamp = DateTime.now();

    const recentMeasurements = initialMeasurements
        .filter(m => nowStamp.diff(m.Date, 'minutes').minutes <= 30)
        .filter(m => m.AnimalProductionId === animalProductionId)
        // HACK: ? -1 : 1 for ascending/increasing order
        // HACK: .sort mutates array, .slice() is used to safely sort
        // this is in descending/decreasing order
        .slice().sort((a, b) => a.Date < b.Date ? 1 : -1)


    await delay(1000);
    return recentMeasurements;
}

const measurementService = {
    getRecentMeasurementsForAnimalProduction,
    keys
}

export default measurementService;