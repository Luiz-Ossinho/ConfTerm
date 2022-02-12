function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const pages = {
    Login: {
        id: 0,
        route: "/login",
        templateRegex: /^(\/login)$/gi,
        requiresAuth: false
    },
    Index: {
        id: 1,
        route: "/",
        templateRegex: /^(\/)$/gi,
        requiresAuth: true
    },
    Reports: {
        id: 2,
        route: "/reports",
        templateRegex: /^(\/reports)$/gi,
        requiresAuth: true
    },
    SpeciesById: {
        id: 3,
        route: "/species/{SpeciesId}",
        templateRegex: /^(\/species\/)\d+$/gi,
        requiresAuth: true
    }
};



function getMatchingPage(route) {
    console.log(route)
    const currentPage = [pages.Login, pages.Index, pages.Reports, pages.SpeciesById].filter(page => page.templateRegex.test(route))[0];
    return currentPage;
};

const pagesExport = { ...pages, getMatchingPage };

function getConsecutiveId(collection) {
    return collection.map(x => x.Id).reduce((previous, current) => Math.max(previous, current), 0) + 1;
}

const ConfortLevel = {
    Confortable: { value: 0, color: 'green', text: 'Confortavel' },
    MildStress: { value: 1, color: 'cyan', text: 'Estresse leve' },
    ModerateStress: { value: 2, color: 'orange', text: 'Estresse mediano' },
    SevereStress: { value: 3, color: 'red', text: 'Estresse severo' },
    GetLevelFromValue: (value) => {
        const match = [ConfortLevel.Confortable, ConfortLevel.MildStress, ConfortLevel.ModerateStress, ConfortLevel.SevereStress]
            .filter(cl => cl.value === value);

        if (!match)
            return undefined;

        return match[0];
    }
}

const ConfortType = {
    THI: 0,
    BGTHI: 1,
    TH: 2
};

export {
    pagesExport as pages,
    ConfortLevel,
    getConsecutiveId,
    ConfortType,
    delay
};