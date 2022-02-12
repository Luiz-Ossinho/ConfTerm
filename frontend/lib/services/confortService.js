import { delay, getConsecutiveId, ConfortLevel, ConfortType } from '../utils'
import { DateTime } from 'luxon'

const keys = {
    thi: 'thi',
    bgthi: 'bgthi',
    th: 'th',
    conforts: 'conforts'
}

const initialConforts = {
    THI: [
        {
            Id: 1,
            MinimalAge: 0,
            SpeciesId: 1,
            MaximumAge: 28,
            Conforts: [
                {
                    Id: 1,
                    MinimalTHI: 0,
                    ConfortGroupId: 1,
                    MaximumTHI: 25,
                    ConfortLevel: ConfortLevel.Confortable.value
                },
                {
                    Id: 2,
                    MinimalTHI: 25,
                    ConfortGroupId: 1,
                    MaximumTHI: 50,
                    ConfortLevel: ConfortLevel.MildStress.value
                },
                {
                    Id: 3,
                    ConfortGroupId: 1,
                    MinimalTHI: 50,
                    MaximumTHI: 75,
                    ConfortLevel: ConfortLevel.ModerateStress.value
                },
                {
                    ConfortGroupId: 1,
                    Id: 4,
                    MinimalTHI: 75,
                    MaximumTHI: 100,
                    ConfortLevel: ConfortLevel.SevereStress.value
                }
            ]
        },
        {
            Id: 2,
            MinimalAge: 0,
            SpeciesId: 2,
            MaximumAge: 28,
            Conforts: [
                {
                    Id: 5,
                    ConfortGroupId: 2,
                    MinimalTHI: 0,
                    MaximumTHI: 30,
                    ConfortLevel: ConfortLevel.Confortable.value
                },
                {
                    Id: 6,
                    ConfortGroupId: 2,
                    MinimalTHI: 30,
                    MaximumTHI: 50,
                    ConfortLevel: ConfortLevel.MildStress.value
                },
                {
                    Id: 7,
                    ConfortGroupId: 2,
                    MinimalTHI: 50,
                    MaximumTHI: 80,
                    ConfortLevel: ConfortLevel.ModerateStress.value
                },
                {
                    Id: 8,
                    ConfortGroupId: 2,
                    MinimalTHI: 80,
                    MaximumTHI: 100,
                    ConfortLevel: ConfortLevel.SevereStress.value
                }
            ]
        }
    ],
    BGTHI: [
        {
            Id: 1,
            MinimalAge: 0,
            SpeciesId: 1,
            MaximumAge: 28,
            Conforts: [
                {
                    Id: 1,
                    ConfortGroupId: 1,
                    MinimalBGTHI: 0,
                    MaximumBGTHI: 25,
                    ConfortLevel: ConfortLevel.Confortable.value
                },
                {
                    Id: 2,
                    ConfortGroupId: 1,
                    MinimalBGTHI: 25,
                    MaximumBGTHI: 50,
                    ConfortLevel: ConfortLevel.MildStress.value
                },
                {
                    Id: 3,
                    ConfortGroupId: 1,
                    MinimalBGTHI: 50,
                    MaximumBGTHI: 75,
                    ConfortLevel: ConfortLevel.ModerateStress.value
                },
                {
                    Id: 4,
                    ConfortGroupId: 1,
                    MinimalBGTHI: 75,
                    MaximumBGTHI: 100,
                    ConfortLevel: ConfortLevel.SevereStress.value
                }
            ]
        }
    ],
    TH: [
        {
            Id: 1,
            MinimalAge: 0,
            SpeciesId: 1,
            MaximumAge: 28,
            Conforts: [
                {
                    Id: 1,
                    ConfortGroupId: 1,
                    MinimalTemperature: 0,
                    MinimalHumidity: 0,
                    MaximumTemperature: 25,
                    MaximumHumidity: 25,
                    ConfortLevel: ConfortLevel.Confortable.value
                },
                {
                    Id: 2,
                    ConfortGroupId: 1,
                    MinimalTemperature: 25,
                    MinimalHumidity: 25,
                    MaximumTemperature: 50,
                    MaximumHumidity: 50,
                    ConfortLevel: ConfortLevel.MildStress.value
                },
                {
                    Id: 3,
                    ConfortGroupId: 1,
                    MinimalTemperature: 50,
                    MinimalHumidity: 50,
                    MaximumTemperature: 75,
                    MaximumHumidity: 75,
                    ConfortLevel: ConfortLevel.ModerateStress.value
                },
                {
                    Id: 4,
                    ConfortGroupId: 1,
                    MinimalTemperature: 75,
                    MinimalHumidity: 75,
                    MaximumTemperature: 100,
                    MaximumHumidity: 100,
                    ConfortLevel: ConfortLevel.SevereStress.value
                }
            ]
        }
    ],
}

function getAllTHI() {
    const storedConforts = localStorage.getItem(keys.thi);

    if (!storedConforts)
        localStorage.setItem(keys.thi, JSON.stringify(initialConforts.THI));

    return JSON.parse(localStorage.getItem(keys.thi));
}

function getAllBGTHI() {
    const storedConforts = localStorage.getItem(keys.bgthi);

    if (!storedConforts)
        localStorage.setItem(keys.bgthi, JSON.stringify(initialConforts.BGTHI));

    return JSON.parse(localStorage.getItem(keys.bgthi));
}

function getAllTH() {
    const storedConforts = localStorage.getItem(keys.th);

    if (!storedConforts)
        localStorage.setItem(keys.th, JSON.stringify(initialConforts.TH));

    return JSON.parse(localStorage.getItem(keys.th));
}

async function getTHIConfortLevels(speciesId, birthday) {
    const allTHIConforts = getAllTHI();

    const targetedConforts = allTHIConforts
        .filter(cr => cr.SpeciesId === speciesId)
        .filter(cr => {
            const currentAge = DateTime.now().diff(DateTime.fromMillis(birthday), 'days').days;
            return currentAge >= cr.MinimalAge && currentAge <= cr.MaximumAge
        })
        .flatMap(cr => cr.Conforts);

    await delay(10);

    return targetedConforts;
}

async function getAllGroups(speciesId) {
    const allTHIGroups = getAllTHI();
    const allBGTHIGroups = getAllBGTHI();
    const allTHGroups = getAllTH();

    await delay(10);

    return {
        THI: allTHIGroups.filter(cr => cr.SpeciesId === speciesId),
        BGTHI: allBGTHIGroups.filter(cr => cr.SpeciesId === speciesId),
        TH: allTHGroups.filter(cr => cr.SpeciesId === speciesId)
    };
}

async function updateConfortGroup(confortGroupId, confortType, minimalAge, maximumAge, user) {
    let groups = [];
    let key = ''

    if (confortType === ConfortType.THI) {
        groups = await getAllTHI();
        key = keys.thi;
    } else if (confortType === ConfortType.TH) {
        groups = await getAllTH();
        key = keys.th;
    } else if (confortType === ConfortType.BGTHI) {
        groups = await getAllBGTHI();
        key = keys.bgthi;
    }

    const original = groups.filter(cg => cg.Id === confortGroupId)[0];
    const listCopy = groups.filter(cg => cg.Id !== confortGroupId);

    const updated = { ...original, MinimalAge: minimalAge, MaximumAge: maximumAge }

    listCopy.push(updated);

    localStorage.setItem(key, JSON.stringify(listCopy))

    await delay(10);

    return updated;
}

async function updateConfortLevel(confortLevelId, confortType, confortProps, user) {
    let groups = [];
    let key = ''

    if (confortType === ConfortType.THI) {
        groups = await getAllTHI();
        key = keys.thi;
    } else if (confortType === ConfortType.TH) {
        groups = await getAllTH();
        key = keys.th;
    } else if (confortType === ConfortType.BGTHI) {
        groups = await getAllBGTHI();
        key = keys.bgthi;
    }

    const originalGroup = groups.filter(confortGroup => confortGroup.Conforts.some(confortLevel => confortLevel.Id === confortLevelId))[0];
    const groupsCopy = groups.filter(confortGroup => !confortGroup.Conforts.some(confortLevel => confortLevel.Id !== confortLevelId));

    const originalConfortLevel = originalGroup.Conforts.filter(confortLevel => confortLevel.Id === confortLevelId)[0];
    const originalConfortLevels = originalGroup.Conforts.filter(confortLevel => confortLevel.Id !== confortLevelId);

    const updated = { ...originalConfortLevel, ...confortProps }

    originalConfortLevels.push(updated);

    originalGroup.Conforts = originalConfortLevels;
    groupsCopy.push(originalGroup);

    localStorage.setItem(key, JSON.stringify(groupsCopy))

    await delay(10);

    return updated;
}

async function createConfortGroup(minimalAge, maximumAge, speciesId, confortType, user) {
    let group = [];
    let key = ''

    if (confortType === ConfortType.THI) {
        group = await getAllTHI();
        key = keys.thi;
    } else if (confortType === ConfortType.TH) {
        group = await getAllTH();
        key = keys.th;
    } else if (confortType === ConfortType.BGTHI) {
        group = await getAllBGTHI();
        key = keys.bgthi;
    }

    const newConfortGroup = {
        Id: getConsecutiveId(group),
        MinimalAge: minimalAge,
        MaximumAge: maximumAge,
        SpeciesId: speciesId,
        Conforts: []
    };

    group.push(newConfortGroup);

    localStorage.setItem(key, JSON.stringify(group))

    await delay(10);

    return newConfortGroup;
}

async function createConfortLevel(confortGroupId, confortLevelProps, confortLevel, confortType, user) {
    let groups = [];
    let key = ''

    if (confortType === ConfortType.THI) {
        groups = await getAllTHI();
        key = keys.thi;
    } else if (confortType === ConfortType.TH) {
        groups = await getAllTH();
        key = keys.th;
    } else if (confortType === ConfortType.BGTHI) {
        groups = await getAllBGTHI();
        key = keys.bgthi;
    }

    const originalGroup = groups.filter(group => group.Id === confortGroupId)[0];
    const originalGroups = groups.filter(group => group.Id !== confortGroupId);

    const confortLevels = [...originalGroups.flatMap(group => group.Conforts), ...originalGroup.Conforts];

    let newConfortLevel = {
        Id: getConsecutiveId(confortLevels),
        ConfortGroupId: confortGroupId,
        ConfortLevel: confortLevel
    };

    newConfortLevel = { ...newConfortLevel, ...confortLevelProps };

    originalGroup.Conforts.push(newConfortLevel);

    originalGroups.push(originalGroup);

    localStorage.setItem(key, JSON.stringify(originalGroups))

    await delay(10);

    return newConfortLevel;
}

const confortService = {
    getTHIFor: getTHIConfortLevels,
    getAllGroupsFor: getAllGroups,
    updateConfortGroup,
    updateConfortLevel,
    createConfortGroup,
    createConfortLevel,
    keys
}

export default confortService;